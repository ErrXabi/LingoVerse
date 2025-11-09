<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PalabraController;
use App\Http\Controllers\RankingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('lingo.welcome');
});

Route::get('/palabras', [PalabraController::class, 'index'])->name('palabras.index');
Route::get('/palabrasStyled', [PalabraController::class, 'indexStyled'])->name('palabras.indexStyled');
Route::get('/palabrasBlade', [PalabraController::class, 'indexBlade'])->name('palabras.indexBlade');

// Ruta que genera la palabra aleatoria (obligatoriamente se le tiene que insertar la cantidad de palabras que vayan a generar desde donde se le llama)
Route::get('/palabrasRandom/{cantidad}', [PalabraController::class, 'indexRandom'])->name('palabras.indexRandomw');

// Ruta que verifica si la palabra dada en la ruta existe en la tabla "palabras" y devuelve json
Route::get('/verificarPalabra/{palabra}', [PalabraController::class, 'verificarPalabra'])
         ->middleware(['auth', 'verified'])
         ->name('palabras.verificarPalabra');

// Ruta que al iniciar sesión o registrarte, en vez de ir al Dashboard de Laravel va a la ruta "juego"
Route::get('/dashboard', function () {
    return redirect()->route('juego');
})->middleware(['auth', 'verified'])->name('dashboard');

// Ruta que al iniciar sesión carga la página de Lingo, "juego.blade.php"
Route::get('/juego', function() {
    return view('juego');
})->middleware(['auth', 'verified'])->name('juego');

// Ruta que carga la págia del Ranking "ranking.blade.php"
Route::get('/ranking', [RankingController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('ranking');

// Ruta que actualiza los puntos en la base de datos
Route::get('/actualizar-puntuacion/{puntos}', [RankingController::class, 'actualizarPuntuacion'])
    ->middleware(['auth', 'verified'])
    ->name('puntuacion.actualizar');

Route::middleware('auth')->group(function () {
Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
