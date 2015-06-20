<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

$app->get('/', function() use ($app) {
    return view('index');
});


$app->get('api/comment', 'CommentController@index');
$app->post('api/comment', 'CommentController@store');
$app->delete('api/comment/{id}', 'CommentController@destroy');


