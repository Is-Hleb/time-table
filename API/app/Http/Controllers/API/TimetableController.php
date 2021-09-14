<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\API\PageParser;

class TimetableController extends Controller
{
    public function __construct(Request $request)
    {
        $data = $request->post();
        $user = User::where('api_token', $data['api_token'])->get();
        if(!$user) {
            return response("Api token not exist", 500);
        }
    }

    public function index(Request $request) {
        $data = $request->post();
        return PageParser::parse($data["pages"]);
    }
}
