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
for(let logo of logohover){//Para cada logo 
    let imagen = logo.querySelector("img");//Toma la primera imagen
    let originalLogo = imagen.src;//Guardamos la imagen orignal
    logo.addEventListener("mouseenter", () => {//Mouse sobre el logo
        let logoalt = imagen.alt;
        imagen.src= `../Knucklebones/Assets/img/${logoalt}_hover.png`; //Cambiamos la imagen por la alterada
    });
    logo.addEventListener("mouseleave", () => {//Mouse sale del logo
        imagen.src= originalLogo; //La imagen vuelve a la original
    });
}
///////////////////////////////////////////////////////////////////////////////////
//Lógica de los botones de la página (Jugar/CómoJugar/Salir)
    //Cerrar la página
const salir = document.getElementById("botonSalir");
salir.addEventListener("click", () => {
    pulsarBoton();
    if (window.open) {//Si la ventana está abierta, la cierra
        window.close();
    }
});
    //Mostrar tutorial
const botonTutotial = document.getElementById("botonTutotial");
botonTutotial.addEventListener("click", () => {
    pulsarBoton();
    const detalle = document.getElementById("tutorial");
    if (detalle.style.display === "block") { //Muestra el texto
        detalle.style.display = "none";
    } else {//Oculta el texto
        detalle.style.display = "block";
    }
});
    //Ir al juego
const comenzarJuego = document.getElementById("botonComenzarJuego");
comenzarJuego.addEventListener("click",()=>{
    pulsarBoton();
	 window.location.href = "../Knucklebones/Juego.html";//Abre la pestaña sobre si misma a la de juego
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
for(let boton of botonHover){//A todos los botones
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
