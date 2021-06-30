<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Attributes;

class GuestController extends Controller
{
    //
    public function search(Request $request){
        $request->validate([
            'filter'=>'required|in:name,price,attribute',
            'name'=>'required_if:filter,name|alpha_dash',
            'min_price'=>'required_if:filter,price|numeric|min:0.1|max:9999999999',
            'max_price'=>'required_if:filter,price|numeric|gt:min_price|max:9999999999',
            'attribute_name'=>'required_if:filter,attribute|string',
            'attribute_value'=>'required_if:filter,attribute'
        ]);
        // return response()->json([$request->attribute_name,$request->attribute_value],200);
        $result = null;
        switch($request->filter){
            case 'name':
                $result = Product::where('active',true)->where(function($q) use($request){
                    $q->where('en_name',$request->name)->orWhere('ar_name',$request->name);
                })->paginate(10);
            break;

            case 'price':
                $result = Product::where('active',true)->whereBetween('price', [$request->min_price, $request->max_price])->paginate(10);
            break;

            case 'attribute':
                $result = Product::where('active',true)->whereHas('attributes', function($attr) use($request){
                    $attr->where('name', $request->attribute_name)->where('value',$request->attribute_value);
                })->paginate(10);
            break;
        }
        $result->load('attributes');
        $result->load('images');
        return response()->json($result,200);
    }

    public function getAllProducts(){
        $products =  Product::where('active',true)->paginate(10);
        $products->load('attributes');
        $products->load('images');
        return response()->json($products,200);
    }
}
