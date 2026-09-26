// Variables globales 
let randTime;
const imagen = document.getElementById("imagenCambiante");
const imagenesPosibles = ["../Knucklebones/Assets/img/oro.png", "../Knucklebones/Assets/img/muerte.png"];
let indice = 0;
let intervaloCambio; // Variable para almacenar el intervalo

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
//Cambiar logo cuando hover
const logohover = document.getElementsByClassName("logoCompany");
for(let logo of logohover){
    let imagenLogo = logo.querySelector("img");
    let originalLogo = imagenLogo.src;
    logo.addEventListener("mouseenter", (e) => { //Detecta si el mouse está sobre el logo
        let logoalt = imagenLogo.alt;
        imagenLogo.src= `../Knucklebones/Assets/img/${logoalt}_hover.png`;
    });

    logo.addEventListener("mouseleave", (e) => { //Detecta si el mouse ha salido del logo
        imagenLogo.src= originalLogo;
    });
}


// Función para cerrar la página
const salir = document.getElementById("botonSalir");
salir.addEventListener("click", () => {
    pulsarBoton();
    if (window.open) {
        alert("¡Gracias por usar la página!");
        window.close();
    } else {
        alert("Esta ventana no puede cerrarse manualmente. Serás redirigido.");
        window.location.href = "https://youtu.be/dQw4w9WgXcQ?si=rp3heCkYsmgmAeiW";
    }
});

//Mostrar tutorial
const botonTutotial = document.getElementById("botonTutotial");

botonTutotial.addEventListener("click", () => {
    pulsarBoton();
    const detalle = document.getElementById("tutorial");
    if (detalle.style.display === "block") {
        detalle.style.display = "none";
    } else {
        detalle.style.display = "block";
    }
});

const musicaFondo = new Audio("../Knucklebones/Assets/sfx/Cult of the Lamb [Official] - Start a Cult - River Boy (youtube).mp3");
musicaFondo.loop = true;
let musicOn = true;
const fondoBotonMusica = document.getElementById("BotonMusica");
//Música
fondoBotonMusica.addEventListener("click",() =>{
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
});
//Pulsar botón Sonido
function pulsarBoton() {	
    let tocarBoton = new Audio("../Knucklebones/Assets/sfx/pulsarBoton.mp3");
	tocarBoton.play();
}
//Acariciar/Hover botón sonido
const botonHover = document.getElementsByClassName("botonDecorado");
for(let boton of botonHover){
    let acariciarBoton = new Audio("../Knucklebones/Assets/sfx/hoverBoton.mp3");
    boton.addEventListener("mouseenter", () => {//Detecta si el mouse está sobre el logo
        acariciarBoton.play();
    });
}


//Ir al juego
const comenzarJuego = document.getElementById("botonComenzarJuego");
comenzarJuego.addEventListener("click",()=>{
    pulsarBoton();
	window.location.href = "../Knucklebones/Juego.html";
});

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
