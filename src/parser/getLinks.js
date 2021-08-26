import {getPage} from "./getPage";
import Settings from "../../settings.json"

const cheerio = require('cheerio-without-node-native')

export const getLinks = async () => {

    let outputData = []
    let cheerioDataH2 = []
    let AllData = []

    let htmlString = await getPage('http://bgaek.by/category/%d1%80%d0%b0%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5/buh-otdel/');
    let $ = cheerio.load(htmlString)
    cheerioDataH2 = $('h2.entry-title')
    AllData.push(cheerioDataH2);

    for (let i = 2; i <= Settings.pagesCount; i++) {
        let url = `http://bgaek.by/category/%d1%80%d0%b0%d1%81%d0%bf%d0%b8%d1%81%d0%b0%d0%bd%d0%b8%d0%b5/buh-otdel/page/${i}/`;
        htmlString = await getPage(url);
        $ = cheerio.load(htmlString)
        cheerioDataH2 = $('h2.entry-title')
        AllData.push(cheerioDataH2)
    }

    AllData.forEach((value => {
        cheerioDataH2 = value;
        cheerioDataH2.each(function () {
            let tagA = $(this).children()
            let dayOfWeek = $(this).text().split(/[()]/)[1];

            switch (dayOfWeek) {
                case 'понедельник':
                    dayOfWeek = 'пн'
                    break;
                case 'вторник':
                    dayOfWeek = 'вт'
                    break;
                case 'среда':
                    dayOfWeek = 'ср'
                    break;
                case 'четверг':
                    dayOfWeek = 'чт'
                    break;
                case 'пятница':
                    dayOfWeek = 'пт'
                    break;
                case 'суббота':
                    dayOfWeek = 'сб'
                    break;
            }

            let date = $(this).text().split(' ').filter(value => (value.split('.').length === 3))[0] ?? "Не выбрано";
            outputData.push({
                href: tagA.attr('href'),
                dayOfWeek,
                date,
                key: Date.now().toString()
            })
        })
    }))

    return outputData;
}
