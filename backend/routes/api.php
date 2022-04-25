<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::prefix('employee')->group(function () {
    Route::get('/',[ EmployeeController::class, 'getAll']);
    Route::post('/',[ EmployeeController::class, 'create']);
    Route::delete('/{id}',[ EmployeeController::class, 'delete']);
    Route::get('/{id}',[ EmployeeController::class, 'get']);
    Route::put('/{id}',[ EmployeeController::class, 'update']);
   // Route::get('/',[ EmployeeController::class, 'consult']);
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
