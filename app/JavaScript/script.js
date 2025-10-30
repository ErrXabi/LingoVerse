filas = 5;
columnas = 6;
let sHTML = "";
for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
        sHTML += `<div class="letra ${i}${j}">A</div>`;
    }
}
let letras = document.getElementById("letras");
letras.innerHTML = sHTML;