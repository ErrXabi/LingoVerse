<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PalabraController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('lingo.welcome');
});

Route::get('/palabras', [PalabraController::class, 'index'])->name('palabras.index');
Route::get('/palabrasStyled', [PalabraController::class, 'indexStyled'])->name('palabras.indexStyled');
Route::get('/palabrasBlade', [PalabraController::class, 'indexBlade'])->name('palabras.indexBlade');

Route::get('/palabrasRandom/{cantidad?}', [PalabraController::class, 'indexRandom'])->name('palabras.indexRandomw');

//Ruta que verifica si la palabra dada en la ruta existe en la tabla 'palabras' y devuelve json
Route::get('/verificarPalabra/{palabra}', [PalabraController::class, 'verificarPalabra'])
         ->middleware(['auth', 'verified'])
         ->name('palabras.verificarPalabra');

Route::get('/dashboard', function () {
    return redirect()->route('juego');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/juego', function() {
    return view('juego');
})->middleware(['auth', 'verified'])->name('juego');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
