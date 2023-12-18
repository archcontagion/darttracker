<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\ScoreController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
});

Route::get('players', [PlayerController::class, 'index']);
Route::post('players', [PlayerController::class, 'store']);
Route::get('players/{player}', [PlayerController::class, 'show']);
Route::put('players/{player}', [PlayerController::class, 'update']);
Route::delete('players/{player}', [PlayerController::class, 'destroy']);

Route::get('scores', [ScoreController::class, 'index']);
Route::post('scores', [ScoreController::class, 'store']);
Route::get('scores/{score}', [ScoreController::class, 'show']);
Route::put('scores/{score}', [ScoreController::class, 'update']);
Route::delete('scores/{score}', [ScoreController::class, 'destroy']);

Route::get('sessions', [SessionController::class, 'index']);
Route::post('sessions', [SessionController::class, 'store']);
Route::get('sessions/{session}', [SessionController::class, 'show']);
Route::put('sessions/{session}', [SessionController::class, 'update']);
Route::delete('sessions/{session}', [SessionController::class, 'destroy']);
