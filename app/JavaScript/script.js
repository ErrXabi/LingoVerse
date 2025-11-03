filas = 5;
columnas = 6;
let sHTML = "";
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        sHTML += `<div class="letra" id="letra${i}${j}"></div>`;
    }
}
let letras = document.getElementById("letras");
letras.innerHTML = sHTML;

const contenedorTeclado = document.getElementById("contenedorTeclado");
const filasTeclado = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ñ"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ];

let tecladoHTML = "";

for (let fila of filasTeclado) {
    tecladoHTML += `<div class="fila-teclado">`;
    for (let letra of fila) {
        tecladoHTML += `<button class="tecla" onclick="mover('${letra}')">${letra}</button>`;
    }
    tecladoHTML += `</div>`;
}

contenedorTeclado.innerHTML = tecladoHTML;

let filaActual = 0;
let columnaActual = 0;

function mover(letra) {
    console.log(letra);
    let celda = document.getElementById(`letra${filaActual}${columnaActual}`)
    celda.innerHTML = letra;
    columnaActual++;

    if (columnaActual >= columnas) {
        columnaActual = 0;
        filaActual++;
    }
    //if (filaActual >= fila) PENDIENTE: LLAMADA A LA FUNCION FINALIZAR PORQUE YA HA PERDIDO
}

async function generarPalabra() {
    try {
        const response = await fetch("http://185.60.43.155:3000/api/word/1");
        if (!response.ok) {
            throw new Error("Error al generar la palabra aleatoria: " + response.status);
        }
        const palabra = await response.json();
        console.log(palabra.word);
    } catch (error) {
        console.log("Error en la petición: " , error);
    }
}
generarPalabra();