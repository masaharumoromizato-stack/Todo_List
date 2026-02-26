<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\CategoryController;

Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/categories', [CategoryController::class, 'store']);
Route::get('/todos', [TodoController::class, 'index']);
Route::post('/todos', [TodoController::class, 'store']);
Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
Route::put('/todos/{id}', [TodoController::class, 'toggle']);
Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);