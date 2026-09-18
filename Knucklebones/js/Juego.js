//Variables globales
    //Tablero
var numFilas = document.getElementById("numFilas");
var numColumnas = document.getElementById("numColumnas");
var contenedorTabla = document.getElementById("contenedorTabla");
    //Dado
    var numDado;

    //Música
var musicaFondo = new Audio("../Knucklebones/Assets/sfx/Cult of the Lamb [Official] - Knucklebones - River Boy (youtube).mp3");
musicaFondo.loop = true;
var musicOn = true;
var fondoBotonMusica = document.getElementById("BotonMusica");


//Generar el array de los tableros
function crearTablero(tableroId){
    let tablero = document.getElementById(tableroId);
    let columnas = tablero.querySelectorAll('.ColumnasT');
    let arrayTablero = [];

    columnas.forEach((columna) => {
        let filas = columna.querySelectorAll('.FilasT p'); //Selección de p de las filas
        let valoresFila = [];

        filas.forEach((fila) => {
            valoresFila.push(fila.textContent);
        });

        arrayTablero.push(valoresFila);
    });
    //console.log(arrayTablero);
    return arrayTablero;
}
//Vaciar Tabla
function limpiarTablero(tableroId){
    let tablero = document.getElementById(tableroId);
    let columnas = tablero.querySelectorAll('.ColumnasT');
    let arrayTablero = [];

    columnas.forEach((columna) => {
        let filas = columna.querySelectorAll('.FilasT p'); //Selección de p de las filas
        let valoresFila = [];

        filas.forEach((fila) => {
            fila.textContent=""        
        });

        arrayTablero.push(valoresFila);
    });
    return arrayTablero;
}

//Número aleatorio dado (1-6)
function generarTirada() {
    return numDado = Math.round(Math.random()*(6 - 1)+1);
}

//Condicion de fin de partida: El tablero A o B está lleno
function finPartida(){
    
}
//Colocar Dado

//Controlador de turno

//Partida
function partida(){
    let partidaAcabada = false;
    let tableroA = gridToArray('TableroA');
    let tableroB = gridToArray('TableroB');

    while(partidaAcabada!=true){

    }
}


//Música Fondo
function controlBGMusica(){
    if(musicOn==true){
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
//MAIN
function main() {
    generarTabla();
}

// Llamar a main cuando la página cargue
window.onload = main;
