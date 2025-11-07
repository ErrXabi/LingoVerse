<?php

namespace App\Http\Controllers;

use App\Models\User;

class RankingController extends Controller
{
    public function index()
    {
        $usuarios = User::orderByDesc('puntuacion')->take(10)->get();
        return view('ranking', compact('usuarios'));
    }
}