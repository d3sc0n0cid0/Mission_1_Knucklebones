let musicaFondo = null; //Le paso que música quiero desde los otros java scripts porque cambia
let musicOn = true;
let fondoBotonMusica = null; //Le pasaré el id del botonMusica 

// Para poder exportarlas a los otros js
export function cargarMusica(ruta) {
    musicaFondo = new Audio(ruta);
    musicaFondo.loop = true; //Para que suene infinitamente
}
//Controla la música global
export function controlMusica(botonId) {
    fondoBotonMusica = document.getElementById(botonId);
   if(musicOn){
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