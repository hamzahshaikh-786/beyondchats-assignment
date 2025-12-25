<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/hello', function () {
    return 'Hello world!';
});

Route::get('/scrape-articles', function () {
    Artisan::call('scrape:articles');
    return 'Articles scraped successfully.';
});
