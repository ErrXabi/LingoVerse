<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Lista de Palabras</title>
</head>
<body>
    <h1>Mi Diccionario</h1>

    <ul>
        @forelse ($palabras as $palabra)
            {{-- Y aquí usamos la columna correcta: $palabra->diccionario --}}
            <li>{{ $palabra->diccionario }}</li>
        @empty
            <li>No hay palabras en la base de datos.</li>
        @endforelse
    </ul>
</body>
</html>