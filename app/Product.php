<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'ar_name', 'en_name', 'price','active','mainimage'
    ];

    public function images(){
        return $this->hasMany('App\Image');
    }

    public function attributes(){
        return $this->hasMany('App\Attribute');
    }

}
