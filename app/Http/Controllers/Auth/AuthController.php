<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

use Auth;

class AuthController extends Controller
{
    //

    public function login(Request $request){
        if(Auth::attempt(['userName' => $request->userName, 'password' => $request->password])){
            $user = Auth::user();
            $token =  $user->createToken('myadmintoken')->accessToken;
            return response()->json(['token'=>$token], 200);
        }
        else{
            return response(null,403);
        }
        // return response()->json(['hee' => 1]);
    }
}
