<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RankingController extends Controller
{
    public function index()
    {
        $usuarios = User::orderByDesc('puntuacion')->take(10)->get();
        return view('ranking', compact('usuarios'));
    }
    public function actualizarPuntuacion($puntos)
    {
        $usuario = Auth::user();

        $usuario->puntuacion = $usuario->puntuacion + (int)$puntos;
        $usuario->save();
    }
}