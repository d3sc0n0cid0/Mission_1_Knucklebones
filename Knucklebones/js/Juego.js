//Variables de la tabla
    //Tablero
    const tamTablero = 3;
    let jugador; 
    let puntuacionA=0;
    let puntuacionB=0;
///////////////////////////////////////////////////////////////////////////////////
//Lógica para mostrar el apartado visual
    //Sustituir el grid por la matriz
function actualizarGridDesdeMatriz(tableroDigital) {
    let tableroVisual; //Con tablero visual me refuero a lo que se ve en pantalla y no a la lógica del propio tablero
    if (jugador === false) {tableroVisual = document.getElementById("TableroA");} //Turno jugador A
    else {tableroVisual = document.getElementById("TableroB");} //Turno jugador B

    let columnas = tableroVisual.querySelectorAll(".ColumnasT");

    // Iterar sobre las filas
    tableroDigital.forEach((filaDigital, indiceFila) => {
        // Iterar sobre las columnas
        filaDigital.forEach((valor, indiceColumna) => {
            // Acceder a la columna y fila correctas en el HTML
            let columnaHTML = columnas[indiceColumna];
            let filasHTML = columnaHTML.querySelectorAll(".FilasT");
            let filaHTML = filasHTML[indiceFila];

            filaHTML.querySelector("p").textContent = valor;
        });
    });
}
    //Sustituir dado en grid
function sustituirDado(numDado){
    document.getElementById("Dado").textContent = numDado;
}
    //Selector de turno, muestra a quien le toca colocar
function turnoDe(){
    const turno = document.getElementById("selectorTurno");
    if(jugador===false){turno.textContent = "Turno de jugador A";}
    else{turno.textContent = "Turno de jugador B";}
}
    //Mostrar puntuación, muestra la puntuación de cada jugador
function mostrarPuntuacion(num){
    let puntuacion;
    if (jugador === false) { puntuacion = document.getElementById("puntuacionA"); puntuacionA=num;} 
    else { puntuacion = document.getElementById("puntuacionB");puntuacionB=num;}
    puntuacion.textContent = `Puntuación: ${num}`; 
}
    //Mostrar ganador muestra quien gana una vez seacaba la partida
function ganador(){
    const jugadorGanador = document.getElementById("selectorGanador");
    const contenedor = document.getElementById("contenedorGanador");
    contenedor.style.display="block";
    
    if(puntuacionA<puntuacionB){
        jugadorGanador.textContent = "Ha ganado el jugador B";
    }
    else if(puntuacionA>puntuacionB){
        jugadorGanador.textContent = "Ha ganado el jugador A";
    }
    else{
         jugadorGanador.textContent = "Ha habido un empate";
    }
}
///////////////////////////////////////////////////////////////////////////////////
//Lógica práctica del juego, es decir el cómo funciona en si 
    //Generar el array de los tableros
function crearTablero(tablero){
    for(let i=0;i<tamTablero;i++){
        tablero[i]=[];
        for(let j=0;j<tamTablero;j++){
            tablero[i][j]=0;
        }
    }
    actualizarGridDesdeMatriz(tablero)
    return tablero;
}
    //Genera el número aleatorio del dado (1-6)
function generarTirada() {
    const numDado = Math.round(Math.random()*(6 - 1)+1);
    sustituirDado(numDado);
    sonidoDado();
    return numDado;
}
    //Selector de columna
function selecColumna() {
    return new Promise((resolve) => {
        const columnas = document.getElementsByClassName("ColumnasT");
        const columnasArray = Array.from(columnas); // Convertir HTMLCollection a array

        // Función para manejar el clic en una columna
        const handleClick = (event) => {
            const columnaElement = event.currentTarget;
            let numColumStr = columnaElement.getAttribute('data-columna');

            let numColum = parseInt(numColumStr);

            // Resolver la promesa con la columna seleccionada
            resolve(numColum);

            // Eliminar el evento de clic para evitar múltiples resoluciones
            columnasArray.forEach(col => {
                col.removeEventListener('click', handleClick);
            });
        };

        // Añadir el evento de clic a cada columna
        columnasArray.forEach(col => {
            col.addEventListener('click', handleClick);
        });
    });
}
    //Colocar el número del dado en la columna seleccionada
function InsertarDadoColumna(dado, columna, tablero){
    for(let j=tamTablero-1;j>=0;j--){
        if(tablero[j][columna]===0){
            tablero[j][columna]=dado;
            actualizarGridDesdeMatriz(tablero) //Ha entrado el dado
            return true;
        }
    }
    actualizarGridDesdeMatriz(tablero)
    return false; //Columna llena, por tanto no es válida esta columna
}
    //Comprobarción con el tablero contrario
function ComprobarTableros(dado, columna, tablero){
    //Comprobar si tiene ese número en la columna
    //Quitar dichos números
    for(let i=0;i<tamTablero;i++){
        if(tablero[i][columna]===dado){ //Tiene ese numero, se borra
            tablero[i][columna]=0;
            perderDados();
        }
    }
    //Llamar a a bajar para que baje si a quedado algún 0 
    for(let i=tamTablero-1;i>=0;i--){
       if (tablero[i][columna] === 0) {
            tablero[i][columna] = bajarNum(i, columna, tablero);
        }
    }
    jugador=!jugador;
    actualizarGridDesdeMatriz(tablero);
    jugador=!jugador;
}
    //Bajar los número si queda un 0 de por medio
function bajarNum(pos, columna, tablero){
     if (pos === 0) {
        let num = tablero[pos][columna];
        tablero[pos][columna] = 0;
        return num;
    }
    if (tablero[pos][columna] === 0) {// Si es 0, bajamos el de arriba
        return bajarNum(pos - 1, columna, tablero);
    } else { // Si no da 0 devolvemos el valor actual
        let valor = tablero[pos][columna];
        tablero[pos][columna] = 0;
        return valor;
    }
}
    //Calculadora de la puntuación
function calcPuntuacion(tablero){
    let puntuacionTotal = 0;
    let puntuacionColumna = 0;
    let filaArray = (Array(7).fill(0));//Un array unidimensional de (0-6)

    for(let columna=0;columna<tamTablero;columna++){//Separamos columnas, para calcular el valor de cada una y comprobar si hay que multiplicar algún valor repetido
        for(let fila=0;fila<tamTablero;fila++){
            let num = tablero[fila][columna];
            filaArray[num] +=1; //Contamos cuanto de cada número hay
        }
        //Ahora confirmamos si ese valor no ha estado antes es decir, si es igual a un número que ya ha aparecido en 
        //La columna, se multiplica por el número de veces que ha aparecido (2,2,2->8)
        for(let i=1;i<=6;i++){//Pasamos por cada número
            if (filaArray[i] > 1 && i!=1) { //Hacemos una elevación excepto si es uno porque eso lo vamos a sumar porque si no da [1,1,1] = 1 y no tendrías ventaja así que mejor [1,1,1]=3
                puntuacionColumna += Math.pow(i, filaArray[i]); //Elevamos 
            } else if (filaArray[i] === 1 && i!=1) { // Sumamos el valor base si 
                puntuacionColumna += i;
            }
            if(i===1){//Si estamos en el caso del número uno, multiplicamos en vez de elevar para que no de 1
                puntuacionColumna += i*filaArray[i];
            }
        }
        puntuacionTotal+=puntuacionColumna;
        //Reiniciamos para la siguiente columna
        puntuacionColumna=0;
        filaArray =(Array(7).fill(0));//Reinicio a 0 para la siguiente columna
    }
    mostrarPuntuacion(puntuacionTotal);
}
    //Condicion de fin de partida: El tablero A o B está lleno
function CondicionFinPartida(tablero){
     for(let i=0;i<tamTablero;i++){
        for(let j=0;j<tamTablero;j++){
           if(tablero[i][j]===0){
                return false;
           }
        }
    }
    ganador();
    return true;
}
///////////////////////////////////////////////////////////////////////////////////
//Partida
async function partida(){ //Asyc para que funcione el await
    //Inicialización de variables
    jugador = false; //True 1 false 0
    let dado;
    let columna;

    let partidaAcabada=false;
    let columnaLlena=true;

    let tableroA = [];
    let tableroB = [];

    crearTablero(tableroA);
    jugador=true;
    crearTablero(tableroB);

    const tableros = [tableroA, tableroB];
    //Inicio de partida
    while(!partidaAcabada){//Hasta que no se llene uno de los tableros no acaba la partida
        //Cambio de turno al otro jugador
        jugador= !jugador;
        turnoDe(); //Cambia el texto de a quien le toca

        //El jugador coloca el dado que le ha tocado
            //Dado que le toca
        dado = generarTirada();
            //Colocar Dado
        do{
            columna = await selecColumna();
            columnaLlena = InsertarDadoColumna(dado, columna, tableros[Number(jugador)]) //Me daba error si no cambiaba a un number
        }while(columnaLlena===false);//Hasta que no o colo que en una columna con hueco no acaba
        
        //Comprobación con el tablero del contrario
        ComprobarTableros(dado, columna,tableros[Number(!jugador)]);//Comprobamos el tablero del rival para eliminar duplicados

        //Calculamos la puntuación de ambos tableros
            jugador=!jugador;//Calculo el contrario
            calcPuntuacion(tableros[Number(jugador)]);
            jugador=!jugador;//Calculo el mío
            calcPuntuacion(tableros[Number(jugador)]);

        //Comprobamos si se ha acabado la partida, si acaba saltar a mensaje de victoria 
        partidaAcabada = CondicionFinPartida(tableros[Number(jugador)]);       
    }
}
/////////////////////////////////////////////////////
//Reacciones de los personajes
    //Volver al idle
function volverIdle(){
    let cordero = document.getElementById("PersonajeA");
    let cabra = document.getElementById("PersonajeB");
    cordero.src = "../Knucklebones/Assets/img/cordero_idle.gif";
    cabra.src = "../Knucklebones/Assets/img/cabra_idle.gif";
}
    //Perder dados
async function perderDados(){
    jugador=!jugador;//Porque le quitas al contrario
    let cordero = document.getElementById("PersonajeA");
    let cabra = document.getElementById("PersonajeB");
    if(jugador===false){//Cordero
        cordero.src = "../Knucklebones/Assets/img/cordero_enfadado.gif";
        cabra.src = "../Knucklebones/Assets/img/cabra_feliz.gif"
    }
    else{//Cabra
        cabra.src = "../Knucklebones/Assets/img/cabra_enfadado.gif";
        cordero.src = "../Knucklebones/Assets/img/cordero_feliz.gif";
    }
    jugador=!jugador;
    await sleep(2400);
    volverIdle();
}
///////////////////////////////////////////////////////////////////////////////////
//Reinicio de la partida
const reiniciar = document.getElementById("reiniciarPagina");
    reiniciar.addEventListener("click", () =>{
        console.log("Reiniciando");
        location.reload(); 
    });
/////////////////////////////////////////////////////
//Sleep
function sleep(milisegundos) {
    return new Promise(resolve=>
        setTimeout(resolve, milisegundos));
}
/////////////////////////////////////////////////////
//Sfx
//Música backgorund
import { cargarMusica, controlMusica } from './musica.js';//Exportamos de musica.js para usar las funciones
cargarMusica("../Knucklebones/Assets/sfx/inicio.mp3");
const musicButton = document.getElementById("BotonMusica");
musicButton.addEventListener("click", () => {
    controlMusica("BotonMusica"); 
});
    //Sonido Dado
function sonidoDado(){
    const sonidoDado = new Audio("../Knucklebones/Assets/sfx/dado.mp3");
    sonidoDado.play();
}
//MAIN
function main() {
    partida();
}
window.onload = main; // Llamar a main cuando la página cargue
