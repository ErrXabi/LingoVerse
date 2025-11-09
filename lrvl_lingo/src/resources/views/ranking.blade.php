<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ranking - Lingo</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
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
    <table>
        <thead>
            <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Puntuación</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($usuarios as $index => $user)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $user->name }}</td>
                    <td>{{ $user->puntuacion }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
    <footer>
    <p>&copy; 2025 Lingo. Todos los derechos reservados.</p>
    </footer>
</body>
</html>