<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function getApiToken() {
        $user = new User([
           'api_token' => Str::random(25),
        ]);
        $user->save();
        return $user->api_token;
    }
}
