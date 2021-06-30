<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/login', 'Auth\AuthController@login')->name('login');

Route::prefix('/admin')->group(function () {
    Route::post('/add-product', 'AdminController@addProduct')->name('addproduct');
});


Route::prefix('/guest')->group(function () {
    // request body : ['filter','name','min_price','max_price','attribute_name','attribute_value']
    // filter value must be one of those ['name','attribute','price']
    // name is required if filter = name and so on
    Route::post('/search-product', 'GuestController@search')->name('searchProduct');

    Route::get('/all-products','GuestController@getAllProducts')->name('allProducts');
});

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
