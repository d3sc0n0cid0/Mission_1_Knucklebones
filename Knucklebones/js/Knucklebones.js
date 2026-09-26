//Lógica de las imágenes que cambian oro/calavera
const imagen = document.getElementById("imagenCambiante");
const imagenesPosibles = ["../Knucklebones/Assets/img/oro.png", "../Knucklebones/Assets/img/muerte.png"];
let indice = 0;
let intervaloCambio; // Variable para almacenar el intervalo
    // Generar número aleatorio
function generarTiempoRandom() {
    return Math.round(Math.random()*(5000 - 2000)+2000);
}
    // Cambiar imagen
function CambioImagen() {
    //Cambio de la imagen 
    imagen.src = imagenesPosibles[indice];
    indice = (indice + 1) % imagenesPosibles.length; // Alterna entre 0 y lenght (que en este caso va a ser 1)
    //Cambio aleatorio y constante
    let tiempo = generarTiempoRandom();
    setTimeout(CambioImagen, tiempo);
}
///////////////////////////////////////////////////////////////////////////////////
//Cambiar logo cuando hover
const logohover = document.getElementsByClassName("logoCompany");
for(let logo of logohover){
    let imagen = logo.querySelector("img");
    let originalLogo = imagen.src;
    logo.addEventListener("mouseenter", () => {//Mouse sobre el logo
        let logoalt = imagen.alt;
        imagen.src= `../Knucklebones/Assets/img/${logoalt}_hover.png`;
    });
    logo.addEventListener("mouseleave", () => {//Mouse sale del logo
        imagen.src= originalLogo;
    });
}
///////////////////////////////////////////////////////////////////////////////////
//Lógica de los botones de la página (Jugar/CómoJugar/Salir)
    //Cerrar la página
const salir = document.getElementById("botonSalir");
salir.addEventListener("click", () => {
    pulsarBoton();
    if (window.open) {
        window.close();
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
    //Ir al juego
const comenzarJuego = document.getElementById("botonComenzarJuego");
comenzarJuego.addEventListener("click",()=>{
    pulsarBoton();
	 window.location.href = "../Knucklebones/Juego.html";
});
///////////////////////////////////////////////////////////////////////////////////
//Lógica del sonido y de la música
import { cargarMusica, controlMusica } from './musica.js';//Exportamos de musica.js para usar las funciones
cargarMusica("../Knucklebones/Assets/sfx/inicio.mp3");
const musicButton = document.getElementById("BotonMusica");
musicButton.addEventListener("click", () => {
    controlMusica("BotonMusica"); 
});
    //Pulsar botón Sonido
function pulsarBoton() {	
    let tocarBoton = new Audio("../Knucklebones/Assets/sfx/pulsarBoton.mp3");
	tocarBoton.play();
}
    //Hover botón sonido
const botonHover = document.getElementsByClassName("botonDecorado");
for(let boton of botonHover){
    let acariciarBoton = new Audio("../Knucklebones/Assets/sfx/hoverBoton.mp3");
    boton.addEventListener("mouseenter", () => {
        acariciarBoton.play();
    });
}
///////////////////////////////////////////////////////////////////////////////////
// MAIN
function main() {
    let tiempo = generarTiempoRandom();
    setTimeout(CambioImagen, tiempo);
}
// Llamar a main cuando la página cargue
window.onload = main;
