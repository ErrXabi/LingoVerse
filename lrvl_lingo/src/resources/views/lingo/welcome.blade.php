<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Lingo') }}</title>

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
        <link rel="stylesheet" href="{{ asset('css/style.css') }}">
        <link rel="shortcut icon" href="{{ asset('img/logo.png') }}" type="image/x-icon">

        @if (file_exists(public_path('build/manifest.json')) || file_exists(public_path('hot')))
            @vite(['resources/css/app.css', 'resources/js/app.js'])
        @endif
    </head>
    <body>
        <header>
            <img src="{{ asset('img/logo.png') }}" alt="logo">
            @if (Route::has('login'))
                <nav class="nav-header">
                    @auth
                        <ul>
                            <li><a href="{{ route('juego') }}">Inicio</a></li>
                            <li><a href="{{ route('ranking') }}">Ranking</a></li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <a href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();">Salir</a>
                                </form>
                            </li>
                        </ul>
                    @else
                        <a href="{{ route('login') }}" class="iniciar-sesion">Iniciar Sesión</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="registrar">Registrarme</a>
                        @endif
                    @endauth
                </nav>
            @endif
        </header>

        @if (Route::has('login'))
            <nav class="nav-main">
                @auth
                    <ul>
                        <li><a href="{{ route('juego') }}">Inicio</a></li>
                        <li><a href="{{ route('ranking') }}">Ranking</a></li>
                        <li>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <a href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();">Salir</a>
                            </form>
                        </li>
                    </ul>
                @else
                    <a href="{{ route('login') }}" class="iniciar-sesion">Iniciar Sesión</a>

                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="registrar">Registrarme</a>
                    @endif
                @endauth
            </nav>
        @endif

        <h1 class="bienvenida">¡Bienvenido! Inicia sesión o registrate para continuar</h1>
    </body>
</html>