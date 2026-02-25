<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;


Route::get('/add', [TodoController::class, 'store']);
Route::get('/todos', [TodoController::class, 'index']);
Route::get('/todos', [TodoController::class, 'index']);
