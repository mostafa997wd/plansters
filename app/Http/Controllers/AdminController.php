<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Image as ImageModel;
use App\Attribute;

use Intervention\Image\Facades\Image;

class AdminController extends Controller
{
    //
    public function __construct()
    {
        // parent::__construct();
        $this->middleware('auth:api');
    }


    public function addProduct(Request $request)
    {
        $request->validate([
            'ar_name' => 'required|alpha_dash|min:3|max:20',
            'en_name' => 'required|alpha_dash|min:3|max:20',
            'price' => 'required|numeric|min:0|max:9999999999',
            'active' => 'nullable|boolean',
            'mainimage' => 'required|image|mimes:jpeg,bmp,png,gif,jpg',
            'images.*' => 'nullable|image|mimes:jpeg,bmp,png,gif,jpg',
            'attributes.*.name' => 'required|string|min:3|max:20',
            'attributes.*.value' => 'required',
        ]);


        $file = $request->file('mainimage');

        if (!file_exists('storage/products/')) {
            mkdir('storage/products/', 666, true);
        }
        $mainImagePath = 'storage/products/' . time() . '.' . $file->getClientOriginalExtension();

        $img = Image::make($file);

        $img->save($mainImagePath);

        $product = Product::create([
            'ar_name' => $request->ar_name,
            'en_name' => $request->en_name,
            'active' => $request->active,
            'price' => $request->price,
            'mainimage' => $mainImagePath,
            'active'=> ($request->active != null)
        ]);

        $gallery_pathes = Array();
        $images = $request->file('images');
        if($images == null){
            $images = [];
        }
        foreach($images as $image){
            $path = 'storage/products/' . time() . '.' . $image->getClientOriginalExtension();
            array_push($gallery_pathes,$path);

            $im = Image::make($image);

            $im->resize(900, 600);

            $im->save($path);

            $product->images()->save(new ImageModel(['path'=>$path]));
        }

        $attributes = $request->get('attributes');
        if($attributes == null){
            $attributes = [];
        }
        foreach($attributes as $attr){

            $product->attributes()->save(new Attribute(['name'=>$attr['name'],'value'=>$attr['value']]));
        }

        return response()->json(['product_id'=>$product->id,'main_image_path'=>$product->mainimage,'gallery_images'=>$gallery_pathes],200);
    }


}
