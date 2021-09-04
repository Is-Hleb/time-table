<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PageParser extends Controller
{
    private function getFinder($link): \DOMXPath
    {
        $html_string = file_get_contents($link);
        return $this->getFinderFromString($html_string);
    }

    private function getFinderFromString($html_string): \DOMXPath
    {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($html_string);
        libxml_clear_errors();
        return new \DOMXPath($dom);
    }

    private function getFinderFromDomElement($node): \DOMXPath
    {
        $dom = new \DOMDocument();
        $dom->loadXML($node->ownerDocument->saveXML($node));
        return new \DOMXPath($dom);
    }

    public function index(Request $request)
    {
        $finder = $this->getFinder(env("PARSER_PAGES_LINK"));
        $links_elms = $finder->query('//div[@class="read-more"]/a');
        $data_regex = "/\d{1,2}\.\d{1,2}\.\d{2,4}/";
        $links = [];
        foreach ($links_elms as $link_el) {
            $links[] = $link_el->getAttribute("href");
        }
        $timetable = [];
        foreach ($links as $link) {
            $finder = $this->getFinder($link);
            $tds_html = $finder->query('//tr');
            $time = $finder->query('//h1[@class="entry-title"]')[0]->textContent;
            $temp = [];
            preg_match_all($data_regex, $time, $temp);
            $time = $temp[0][0];
            // dd($time[0]);
            $timetable[$time] = [];
            $cur_timetable = [];
            $group1 = 0;
            $group2 = 0;
            foreach ($tds_html as $td_html) {
                $finder = $this->getFinderFromDomElement($td_html);
                $data = $finder->query('//td');
                $temp_data = [];

                foreach ($data as $item) {
                    $content = $item->textContent;
                    $temp_data[] = $content;
                }
                if (sizeof($temp_data) <= 4) {
                    $group1 = $temp_data[1];
                    $group2 = $temp_data[2];
                    continue;
                }
                if(strlen($temp_data[1]) > 3) {
                    $cur_timetable[$group1][] = [
                        "hour" => $temp_data[0],
                        "subject" => $temp_data[1],
                        "cabinet" => $temp_data[2],
                    ];
                }
                if(strlen($temp_data[3]) > 3) {
                    $cur_timetable[$group2][] = [
                        "hour" => $temp_data[0],
                        "subject" => $temp_data[3],
                        "cabinet" => $temp_data[4],
                    ];
                }
                $timetable[$time] = $cur_timetable;
            }
        }
        return json_encode($timetable, JSON_UNESCAPED_UNICODE);
    }
}
