<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ranking</title>
    <link rel="stylesheet" href="{{ asset('css/ranking.css') }}">
</head>
<body>
    <h1>🏆 Ranking de Jugadores</h1>

    <table border="1" cellpadding="8" cellspacing="0">
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
                    <td>{{ $user->score }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <a href="{{ route('juego') }}">Volver al juego</a>
</body>
</html>