<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
       $request->headers->set('Access-Control-Allow-Origin','*');
        $request->headers->set('Access-Control-Allow-Methods','GET , POST , PUT , DELETE , OPTIONS');
        $request->headers->set('Access-Control-Allow-Headers','*');
        return $next($request);
   }
}
