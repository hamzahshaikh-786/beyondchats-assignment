<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController;

// API routes
Route::middleware('api')->group(function () {

    // Test route
    Route::get('test', function () {
        return response()->json(['message' => 'API works!']);
    });

    // CRUD routes for Articles
    Route::apiResource('articles', ArticleController::class);

});
