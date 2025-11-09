<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página principal - Lingo</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="shortcut icon" href="{{ asset('img/logo.png') }}" type="image/x-icon">
    
</head>
<body>
    <header>
        <img src="{{ asset('img/logo.png') }}" alt="logo">
        <nav class="nav-header">
            <ul>
                <li><a href="{{ route('juego') }}">Inicio</a></li>
                <li><a href="{{ route('ranking') }}">Ranking</a></li>
                <li>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); this.closest('form').submit();">Cerrar sesión</a>
                    </form>
                </li>
            </ul>
        </nav>
    </header>
    <nav class="nav-main">
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
    </nav>
    <main>
        <div class="juego">
            <div id="letras"></div>
            <aside>
                <h3 id="tiempoFila">Tiempo restante para completar la fila: <span id="temporizador">30s</span></h3>
                <h3 id="tiempoTotal">Tiempo utilizado: 0s</h3><br>
                <h3>Instrucciones:</h3>
                <li>
                    <b><span class="verde">Verde</span> = La letra está en la posición correcta</b>
                </li>
                <li>
                    <b><span class="naranja">Naranja</span> = La letra está en otra posición</b>
                </li>
                <li>
                    <b><span class="rojo">Rojo</span> = La letra no existe</b>
                </li>
            </aside>
        </div>
        <div id="contenedorTeclado"></div>
        <script src="{{ asset('js/script.js') }}"></script>
    </main>
</body>
</html>