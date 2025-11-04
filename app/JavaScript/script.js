document.addEventListener("DOMContentLoaded", () => {
    generarPalabra();
})

let filas = 5;
let columnas = 5;
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
    tecladoHTML += `<div class="filaTeclado">`;
    for (let letra of fila) {
        tecladoHTML += `<button class="tecla" onclick="mover('${letra}')">${letra}</button>`;
    }
    tecladoHTML += `</div>`;
}

contenedorTeclado.innerHTML = tecladoHTML;

let filaActual = 0;
let columnaActual = 0;
let intento = "";

function mover(letra) {
    let celda = document.getElementById(`letra${filaActual}${columnaActual}`);
    celda.innerHTML = letra;
    intento += letra;
    columnaActual++;

    if (columnaActual >= columnas) {
        comprobar();
    }
    if (filaActual >= filas) {
        return;
    }
}


let secreta = "";

async function comprobar() {
    if (!secreta) {
        await generarPalabra();
    }
    
    intento = intento.toUpperCase();
    let arraySecreta = secreta.split('');
    let arrayIntento = intento.split('');
    
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
    if (intento == secreta) {
        let teclas = document.querySelectorAll(".tecla");
        teclas.forEach(tecla => {
            tecla.disabled = true;
        });
    }
    columnaActual = 0;
    filaActual++;
    intento = "";
}

async function generarPalabra() {
    try {
        const response = await fetch("http://185.60.43.155:3000/api/word/1");
        if (!response.ok) {
            throw new Error("Error al generar la palabra aleatoria: " + response.status);
        }
        const palabra = await response.json();
        secreta = palabra.word.toUpperCase()
        console.log(secreta);
    } catch (error) {
        console.log("Error en la petición: " , error);
    }
}