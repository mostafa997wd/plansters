<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Attribute extends Model
{
    //
    protected $fillable = [
        'name','value'
     ];

     public function product() {
         return $this->hasMany('App\Product');
     }

}
