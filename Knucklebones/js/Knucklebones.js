// Variables globales 
var randTime;
var imagen = document.getElementById("imagenCambiante");
var imagenesPosibles = ["../Knucklebones/Assets/img/oro.png", "../Knucklebones/Assets/img/muerte.png"];
var indice = 0;
var intervaloCambio; // Variable para almacenar el intervalo

var musicaFondo = new Audio("../Knucklebones/Assets/sfx/Cult of the Lamb [Official] - Start a Cult - River Boy (youtube).mp3");
musicaFondo.loop = true;
var musicOn = true;
var fondoBotonMusica = document.getElementById("BotonMusica");

var hoverBoton = document.getElementsByClassName("botonSound1");
var tocarBoton = new Audio("../Knucklebones/Assets/sfx/pulsarBoton.mp3");
var acariciarBoton = new Audio("../Knucklebones/Assets/sfx/hoverBoton.mp3");


// Generar número aleatorio
function generarTiempoRandom() {
    return randTime = Math.round(Math.random()*(7000 - 2000)+2000);
}
// Cambiar imagen
function CambioImagen() {
    if (!imagen) {
        console.error("El elemento 'imagenCambiante' no existe en el DOM.");
        return;
    }
    imagen.src = imagenesPosibles[indice];
    indice = (indice + 1) % imagenesPosibles.length; // Alterna entre 0 y 1
    randTime = generarTiempoRandom();
}

// Función para cerrar la página
function salir() {
    if (window.open) {
        alert("¡Gracias por usar la página!");
        
        window.close();
    } else {
        alert("Esta ventana no puede cerrarse manualmente. Serás redirigido.");
        window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=rp3heCkYsmgmAeiW";
    }
}
//Mostrar tutorial
function js_tutorial(id) {
    var detalle = document.getElementById(id);
    if (detalle.style.display === "block") {
        detalle.style.display = "none";
    } else {
        detalle.style.display = "block";
    }
}
//Música
function controlBGMusica(){
    if(musicOn===true){
        musicaFondo.play();
        musicOn=false;
        fondoBotonMusica.style.backgroundImage = "url('../Knucklebones/Assets/img/Music.png')";
    }
    else{
         musicaFondo.pause();
         musicOn=true;
        fondoBotonMusica.style.backgroundImage = "url('../Knucklebones/Assets/img/MusicNo.png')";
    }
}
//Tocar Botones Sonido
document.addEventListener("DOMContentLoaded", function() {
    if (hoverBoton) {
        hoverBoton.addEventListener("pointerenter", () => {
            acariciarBoton.play();
        });
    }
});
//Ir al juego
function jugar(){
	 window.location.href = "../Knucklebones/Juego.html";
}

// MAIN
function main() {
    randTime = generarTiempoRandom();

    // Iniciar el intervalo solo una vez
    if (!intervaloCambio) {
        intervaloCambio = setInterval(CambioImagen, randTime);
    }
}

// Llamar a main cuando la página cargue
window.onload = main;
