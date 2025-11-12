// Llamadas a las funciones generarPalabra() y contadorFila() al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    generarPalabra();
    contadorFila();
})

let relojFila = 30; // Variable contador regresivo por cada fila de 30s
let relojTotal = 0; // Variable contador total de tiempo utilizado de la partida
let reloj; // Variable de intervalo del reloj

let filas = 5; // Variable de las filas totales del juego
let columnas = 5; // Variable de las columnas totales del juego
let sHTML = ""; // Variable donde se generará el HTML con el juego (letras escritas y teclado con sus letras)

// Se generará la tabla de letras escritas de tamaño 5x5
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        sHTML += `<div class="letra" id="letra${i}${j}"></div>`;
    }
}

// Imprimir la tabla donde van a aparecer las letras que escribirá el usuario
let letras = document.getElementById("letras");
letras.innerHTML = sHTML;

// Generar el teclado, almacenando las letras del teclado QWERTY en una lista
const contenedorTeclado = document.getElementById("contenedorTeclado");
const filasTeclado = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ];

let tecladoHTML = "";

// Generar el teclado el teclado
for (let fila of filasTeclado) {
    tecladoHTML += `<div class="filaTeclado">`;
    for (let letra of fila) {
        tecladoHTML += `<button class="tecla" onclick="mover('${letra}')">${letra}</button>`;
    }
    tecladoHTML += `</div>`;
}

// Imprimir el teclado
contenedorTeclado.innerHTML = tecladoHTML;

// Variables donde controlará la fila y columna actual del usuario, intento guardará cada letra que escriba el usuario
let filaActual = 0;
let columnaActual = 0;
let intento = "";

// Función mover() donde recibe la variable letra como parámetro, que es la letra que ha seleccionado el usuario
function mover(letra) {
    // En cada celda de las letras, se pondrá cada letra que haya puesto el usuario, después se guardará en intento, y avanzará la columna actual
    let celda = document.getElementById(`letra${filaActual}${columnaActual}`);
    celda.innerHTML = letra;
    intento += letra;
    columnaActual++;

    // Cuando el usuario llegue a la última columna, antes de pasar fila, llamará a la función comprobar(), para comprobar que la palabra del intento sea correcto
    if (columnaActual >= columnas) {
        comprobar();
    }
    
    // Cuando el usuario llegue a la última fila, antes de pasar a la siguiente, después de la última, el programa se detendrá
    if (filaActual >= filas) {
        return;
    }
}

// Función para controlar el teclado de las letras del juego con el teclado físico
document.addEventListener("keydown", (event) => {
    let key = event.key.toUpperCase(); // Variable key donde se guarda la tecla que ha pulsado el usuario, automáticamente se pasa a mayúsculas

    // Si una de las letras que ha pulsado el usuario está entre la A, Z, o Ñ, se llamará a la función mover() y se le pasará la letra que se ha pulsado por parámetro
    if (/^[A-ZÑ]$/.test(key)) {
        mover(key);
    }
    // Si la tecla que ha pulsado el usuario es la tecla de borrar, se borrará una letra de las letras que ha escrito el usuario
    if (key === "BACKSPACE") {
        borrarLetra();
    }
});

// Función borrarLetra() que elimina la última letra que ha escrito el usuario y retrocede una columna
function borrarLetra() {
    if (columnaActual > 0) {
        columnaActual--;
        let celda = document.getElementById(`letra${filaActual}${columnaActual}`);
        celda.innerHTML = "";
        intento = intento.slice(0, -1);
    }
}

let secreta = ""; // Variable donde se guardará la palabra secreta, generada automáticamente utilizando una ruta hacia la BD

// Función asíncrona comprobar() donde se genera la palabra aleatoria
async function comprobar() {
    // Si todavía no se ha generado la palabra secreta, llama a la función generarPalabra() y espera hasta que le devuelva el resultado, ente caso un string
    if (!secreta) {
        await generarPalabra();
    }
    
    // La variable intento pasa automáticamente a mayúsculas, en la variable arraySecreta se guarda la palabra secreta, toda junta, sin espacios,
    // y en la variable arrayIntento se guarda la palabra completa sin separaciones del intento que ha hecho el usuario
    intento = intento.toUpperCase();
    let arraySecreta = secreta.split('');
    let arrayIntento = intento.split('');
    
    // En la variable palabraValida que será boolean, se llamará a la función verificarDiccionario() para comprobar que la palabra que ha escrito el usuario existe en el diccionario o no
    let palabraValida = await verificarDiccionario(arrayIntento);
    // En el caso de que la palabra no exista, se mostrará un alert donde se indicará al usuario que la palabra no existe, y ha perdido un intento, yendo a la primera columna y a la siguiente fila
    if (!palabraValida) {
        alert("La palabra introducida no está en el diccionario. Has perdido un intento");
        columnaActual = 0;
        filaActual++;
        // Si la palabra no existe, y la fila actual es la última de la tabla, se detendrá el juego completamente
        if (filaActual >= filas) {
            pararContador();
            document.getElementById("tiempoFila").innerHTML = `Has agotado todos tus intentos. La palabra era: ${secreta}`;
        }
        return;
    }

    // El for recorre la fila completa, una vez que se haya verificado la palabra, y cambia el color de fondo de las casillas de las letras, dependiendo de la letra que haya en la palabra generada automáticamente, y la que haya escrito el usuario
    for (let i = 0; i < columnas; i++) {
        let celda = document.getElementById(`letra${filaActual}${i}`);
        celda.style.color = "white";
        if (arrayIntento[i] == arraySecreta[i]) {
            celda.style.backgroundColor = "#4ECDC4";
        }
        else if (arraySecreta.includes(arrayIntento[i])) {
            celda.style.backgroundColor = "#F3A83B";
        }
        else {
            celda.style.backgroundColor = "#E2574A";
        }
    }

    // En el caso de que la palabra que ha escrito el usuario sea la misma que la palabra que se ha generado automáticamente, el juego se detiene automáticamente,
    // y se actualiza la puntuación en la BD, dependiendo del tiempo que haya tardado el usuario en completar el juego
    if (intento == secreta) {
        pararContador();
        let puntuacion = Math.max(100, 1000 - (relojTotal) * 10);
        document.getElementById("tiempoFila").innerHTML = `¡Enhorabuena! Has necesitado ${relojTotal}s. Y has ganado ${puntuacion} puntos`;
        fetch(`/actualizar-puntuacion/${puntuacion}`);
        return;
    }

    // Si la palabra adivinada no es la misma que la palabra generada, el juego sigue, aumenta de fila, vuelve a la primera columna de la tabla, el contador por fila
    // vuelve a 30s y la palabra del intento se vuelve a vaciar
    columnaActual = 0;
    filaActual++;
    relojFila = 30;
    intento = "";

    // Si todavía la palabra no se ha adivinado, y al pasar de fila, la fila actual del usuario supera el máximo, vuelve se detiene el juego automáticamente, y pierde la partida
    if (filaActual >= filas) {
        pararContador();
        document.getElementById("tiempoFila").innerHTML = `Has agotado todos tus intentos. La palabra era: ${secreta}`;
    }
}
// Función asíncronav verificarDiccionario() donde se llama a la API del diccionario, y recibe como parámetro la palabra completa sin separaciones que ha escrito el usuario
// si la palabra existe, se devolverá un true, sino false
async function verificarDiccionario(arrayIntento) {
    try {
        arrayIntento = arrayIntento.join('').toLowerCase();
        const response = await fetch(`http://185.60.43.155:3000/api/check/${arrayIntento}`);
        if (!response.ok) {
            throw new Error("Error en la API de verificación");
        }
        const data = await response.json();
        return data.exists;
    } catch (error) {
        ("Error en la petición: ", error);
        return false;
    }
}

// Función asícrona generarPalabra() donde se genera 1 palabra aleatoria haciendo una llamada mediante una ruta de Laravel a la BD de palabras
async function generarPalabra() {
    let palabraValida = false;
    while (!palabraValida) {
        try {
                const response = await fetch(`/palabrasRandom/1`);
                if (!response.ok) {
                    throw new Error("Error al generar la palabra aleatoria: " + response.status);
                }
                const palabra = await response.json();
                secreta = palabra.diccionario.toUpperCase();

                if (secreta.length == 5) {
                    palabraValida = true;
                }
        } catch (error) {
            console.log("Error en la petición: " , error);
        }
    }
}

// Función del contador de cada fila
function contadorFila() {
    reloj = setInterval(() => {
        relojFila--;
        relojTotal++;
        document.getElementById("tiempoFila").innerHTML = `Tiempo restante para completar la fila: ${relojFila}s`;
        document.getElementById("tiempoTotal").innerHTML = `Tiempo utilizado: ${relojTotal}s`;
        if (relojFila <= 0) {
            if (filaActual >= filas-1) {
                pararContador();
                document.getElementById("tiempoFila").innerHTML = `Se ha agotado el tiempo. La palabra era: ${secreta}`;
            }
            else {
                columnaActual = 0;
                filaActual++;
                relojFila = 30;
            }
        }
    }, 1000);
}

// Función para detener todos los contadores que estén en marcha, y desactivar el teclado
function pararContador() {
    clearInterval(reloj);
    let teclas = document.querySelectorAll(".tecla");
        teclas.forEach(tecla => {
            tecla.disabled = true;
    });
}