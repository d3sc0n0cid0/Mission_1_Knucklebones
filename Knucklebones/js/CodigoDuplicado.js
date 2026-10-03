//MÚSICA
let musicaFondo = null; //Le paso que música quiero desde los otros java scripts porque cambia
let musicOn = true;
let fondoBotonMusica = null; //Le pasaré el id del botonMusica 

// Para poder exportarlas a los otros js
function cargarMusica(ruta) {
    musicaFondo = new Audio(ruta);
    musicaFondo.loop = true; //Para que suene infinitamente
}
//Controla la música global
function controlMusica(botonId) {
    fondoBotonMusica = document.getElementById(botonId);
   if(musicOn){
        musicaFondo.play();
        musicOn=false;
        fondoBotonMusica.classList.add("botonMusica-on");
        fondoBotonMusica.classList.remove("botonMusica-off");
    }
    else{
         musicaFondo.pause();
         musicOn=true;
        fondoBotonMusica.classList.remove("botonMusica-on");
        fondoBotonMusica.classList.add("botonMusica-off");
    }
}

function inicializar(ruta, botonId){ //Y ahora esta función es para montar todo sin tener que crearlo fuera
    cargarMusica(ruta);
    botonId.addEventListener("click", () => {
        controlMusica("BotonMusica"); 
    });
}

//MODO OSCURO
function modoClaro (){
    document.addEventListener("keydown", (event) => {
        if (event.key === "l") {
            document.body.classList.toggle("light");
        }
    });
}

//Inicializar todo para no hacer varias llamadas en el amin
export function arrancarPagina(rutaMusica, funcionMain) {
    const musicButton = document.getElementById("BotonMusica");
    if (musicButton) {
        inicializar(rutaMusica, musicButton);
    }
    
    modoClaro();

    //Llamar una función desde el main
    if (funcionMain) {
        window.onload = funcionMain;
    }
}