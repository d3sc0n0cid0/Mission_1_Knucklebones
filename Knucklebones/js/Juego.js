//importar de CódigoDuplicado
import { arrancarPagina } from './utilidadesComunes.js';
//Variables de la tabla
    //Tablero
    let tamTablero = parseInt(sessionStorage.getItem("tamTablero")) || 3; // Si hay un valor guardado en sessionStorage usamos ese, si no, 3 por defecto
    let jugador; 
    let rival;
    let puntuacionA = 0;//Valores digitales, más abajo elPuntuaciónA/B es para la parte visual
    let puntuacionB = 0;
    // Caché de elementos HTML para no hacer querySelectorAll en cada jugada
    let cacheMatrizA = [];
    let cacheMatrizB = [];
    // Caché de elementos estáticos del DOM
    let Dado, turno, elPuntuacionA, elPuntuacionB, jugadorGanador, contenedorGanador;
    let PersonajeA, PersonajeB;

function inicializarCacheDOM() {
    Dado = document.getElementById("Dado");
    turno = document.getElementById("selectorTurno");
    elPuntuacionA = document.getElementById("puntuacionA");
    elPuntuacionB = document.getElementById("puntuacionB");
    jugadorGanador = document.getElementById("selectorGanador");
    contenedorGanador = document.getElementById("contenedorGanador");
    PersonajeA = document.getElementById("PersonajeA");
    PersonajeB = document.getElementById("PersonajeB");
}
///////////////////////////////////////////////////////////////////////////////////
//Generación de tablero dinámico
function generarTableroDOM(tablero) {
    const contenedorTablero = document.getElementById(tablero);
    contenedorTablero.innerHTML = "";
    contenedorTablero.style.gridTemplateColumns = `repeat(${tamTablero}, auto)`; // Ajuste dinámico del grid CSS
    // Matriz temporal para guardar las referencias a los <p>
    let matrizCache = []; 
    for (let f = 0; f < tamTablero; f++) {
        matrizCache[f] = [];
    }
    // Columnas
    for (let col = 0; col < tamTablero; col++) {
        const columnaDiv = document.createElement("div"); //<div> que representará a la columna
        columnaDiv.classList.add("ColumnasT"); //css "ColumnasT" para que mantenga los estilos
        columnaDiv.setAttribute("data-columna", col); //Guardo el índice de la columna para cuando haga clic
        // Filas de las columnas
        for (let fila = 0; fila < tamTablero; fila++) {
            const filaDiv = document.createElement("div"); //Para cada casilla individual
            filaDiv.classList.add("FilasT"); //css
            const textoP = document.createElement("p"); //Contener dado
            textoP.textContent = "0";

            matrizCache[fila][col] = textoP; // Guardamos la referencia directa al nodo <p>

            filaDiv.appendChild(textoP); //El texto va dentro de la casilla
            columnaDiv.appendChild(filaDiv); //Las filas van dentro de la columna
        }
        contenedorTablero.appendChild(columnaDiv);//Y todo va en el tablero
    }
    // Asignamos la matriz de caché al tablero correspondiente
    if (tablero === "TableroA") {cacheMatrizA = matrizCache;}
    else {cacheMatrizB = matrizCache;}
}
///////////////////////////////////////////////////////////////////////////////////
//Lógica para mostrar el apartado visual
    //Sustituir el grid por la matriz
function actualizarGridDesdeMatriz(tablero, esJugador) {
    //Modificación únicamente de las columnas
    let cacheTablero;
    if(esJugador===0){cacheTablero=cacheMatrizA;}//JugadorA
    else{cacheTablero=cacheMatrizB;}//JugadorB
    for(let fila=0;fila<tamTablero;fila++){
        for(let columna=0;columna<tamTablero;columna++){
            cacheTablero[fila][columna].textContent = tablero[fila][columna];
        }
    }        
}
    //Sustituir dado en grid
function sustituirDado(numDado){
    Dado.textContent = numDado;
}
    //Selector de turno, muestra a quien le toca colocar
function turnoDe(){
    if(jugador===0){turno.textContent = "Turno de jugador A";}
    else{turno.textContent = "Turno de jugador B";}
}
    //Mostrar puntuación, muestra la puntuación de cada jugador
function mostrarPuntuacion(num, esJugador){
    if (esJugador === 0) { 
        puntuacionA = num; 
        elPuntuacionA.textContent = `Puntuación: ${num}`;
    } 
    else { 
        puntuacionB = num; 
        elPuntuacionB.textContent = `Puntuación: ${num}`;
    }
}
    //Mostrar ganador muestra quien gana una vez seacaba la partida
function ganador(){
    contenedorGanador.classList.remove("oculto");
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
function crearTablero(tablero, esJugador){
    for(let i=0;i<tamTablero;i++){
        tablero[i]=[];
        for(let j=0;j<tamTablero;j++){
            tablero[i][j]=0;
        }
    }
    actualizarGridDesdeMatriz(tablero, esJugador)
    return tablero;
}
    //Genera el número aleatorio del dado (1-6)
function generarTirada() {
    const numDado = Math.floor(Math.random() * 6) + 1; // Math.floor con * 6 + 1 da números equiprobables del 1 al 6
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
function insertarDadoColumna(dado, columna, tablero){
    for(let j=tamTablero-1;j>=0;j--){
        if(tablero[j][columna]===0){
            tablero[j][columna]=dado;
            return true;
        }
    }
    return false; //Columna llena, por tanto no es válida esta columna
}
    //Comprobarción con el tablero contrario
function comprobarTableros(dado, columna, tablero, esJugadorRival){
    //Comprobar si tiene ese número en la columna
    //Quitar dichos números
    for(let i=0;i<tamTablero;i++){
        if(tablero[i][columna]===dado){ //Tiene ese numero, se borra
            tablero[i][columna]=0;
            perderDados(esJugadorRival);
        }
    }
    //Llamar a a bajar para que baje si a quedado algún 0 
    for(let i=tamTablero-1;i>=0;i--){
       if (tablero[i][columna] === 0) {
            tablero[i][columna] = bajarNum(i, columna, tablero);
        }
    }
}
    //Bajar los número si queda un 0 de por medio
function bajarNum(pos, columna, tablero){
     if (pos === 0) {
        const num = tablero[pos][columna];
        tablero[pos][columna] = 0;
        return num;
    }
    if (tablero[pos][columna] === 0) {// Si es 0, bajamos el de arriba
        return bajarNum(pos - 1, columna, tablero);
    } else { // Si no da 0 devolvemos el valor actual
        const valor = tablero[pos][columna];
        tablero[pos][columna] = 0;
        return valor;
    }
}
    //Calculadora de la puntuación
function calcPuntuacion(tablero, esJugador){
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
    mostrarPuntuacion(puntuacionTotal, esJugador);
}
    //Condicion de fin de partida: El tablero A o B está lleno
function condicionFinPartida(tablero){
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
    //Cambio de jugador
function cambioJugador(){
    jugador = 1 - jugador;
    rival = 1 - jugador;
}
///////////////////////////////////////////////////////////////////////////////////
//Partida
async function partida(){ //Asyc para que funcione el await
    //Inicialización de variables
    inicializarCacheDOM();

    generarTableroDOM("TableroA");
    generarTableroDOM("TableroB");

    jugador = 1; // 0 jugador A 1 jugador 2
    rival = 0;

    let dado;
    let columna;

    let partidaAcabada=false;
    let insertadoConExito=true;

    let tableroA = [];
    let tableroB = [];

    crearTablero(tableroA, 0);
    crearTablero(tableroB, 1);

    const tableros = [tableroA, tableroB];
    //Inicio de partida
    while(!partidaAcabada){//Hasta que no se llene uno de los tableros no acaba la partida
        //Cambio de turno al otro jugador
        cambioJugador();
        turnoDe(); //Cambia el texto de a quien le toca

        //El jugador coloca el dado que le ha tocado
            //Dado que le toca
        dado = generarTirada();
            //Colocar Dado
        do{
            columna = await selecColumna();
            insertadoConExito = insertarDadoColumna(dado, columna, tableros[jugador]) //Me daba error si no cambiaba a un number
        }while(insertadoConExito===false);//Hasta que no o colo que en una columna con hueco no acaba
        
        //Comprobación con el tablero del contrario
        comprobarTableros(dado, columna,tableros[rival], rival);//Comprobamos el tablero del rival para eliminar duplicados

        //Calculamos la puntuación de ambos tableros
            calcPuntuacion(tableroA, 0);//A
            calcPuntuacion(tableroB, 1);//B

        //Actualizamos el array completo :D
            actualizarGridDesdeMatriz(tableros[jugador],jugador);
            actualizarGridDesdeMatriz(tableros[rival], rival);
            
        //Comprobamos si se ha acabado la partida, si acaba saltar a mensaje de victoria 
        partidaAcabada = condicionFinPartida(tableroA) || condicionFinPartida(tableroB); //Aunque tecnicamente solo ahce falta comprobar el acutal el webi arena me salta error si no lo pongo así   
    }
}
//////////////////////////////////////////////////////////////////////////////////
//Teclas especiales
    //Añadir celdas
document.addEventListener("keydown", (event) => {
    if (event.key === "+") {
        let nuevoTamano = prompt("Tamaño del tablero (2-9)", tamTablero);
        let tamParsed = parseInt(nuevoTamano);

        if (nuevoTamano !== null && /^[0-9]+$/.test(nuevoTamano)) { 
            if (tamParsed > 1 && tamParsed <10) { //Si pones un tamaño muy grande explota un poco
                if (confirm(`¿Quieres reiniciar la partida con un tablero de ${tamParsed}x${tamParsed}?`)) {
                // Guardamos el tamaño con la clave "tamTablero" entre comillas
                    sessionStorage.setItem("tamTablero", tamParsed); 
                    // Reiniciamos la página de forma limpia
                    location.reload();
                }
                else {
                alert("Por favor, introduce un tamaño válido entre 2 y 9.");
                }
            }
        }
    }
});
/////////////////////////////////////////////////////
//Reacciones de los personajes
    //Volver al idle
function volverIdle(){
    PersonajeA.src = "Assets/img/cordero_idle.gif";
    PersonajeB.src = "Assets/img/cabra_idle.gif";
}
    //Perder dados
function perderDados(jugadorAfectado){ 
    if (jugadorAfectado === 0) { 
        PersonajeA.src = "Assets/img/cordero_enfadado.gif";
        PersonajeB.src = "Assets/img/cabra_feliz.gif";
    } else { 
        PersonajeB.src = "Assets/img/cabra_enfadado.gif";
        PersonajeA.src = "Assets/img/cordero_feliz.gif";
    }
    setTimeout(() => { volverIdle(); }, 2400);
}
///////////////////////////////////////////////////////////////////////////////////
//Reinicio de la partida
const reiniciar = document.getElementById("reiniciarPagina");
    reiniciar.addEventListener("click", () =>{
        console.log("Reiniciando");
        location.reload(); 
    });
/////////////////////////////////////////////////////
//Sfx
    //Sonido Dado
function sonidoDado(){
    const sonidoDado = new Audio("Assets/sfx/dado.mp3");
    sonidoDado.play();
}
/////////////////////////////////////////////////////
//Inicialización de las funciones de código duplicado
    //Música fondo + modo claro + partida
arrancarPagina("Assets/sfx/juego.mp3", partida);

/*
Generar columna está basado en cómo estaba creado antes en el html  (lo dejo para verlo mejor)
                        <div data-columna="0" class="ColumnasT">
                            <div class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                        </div>
                        <div data-columna="1" class="ColumnasT">
                            <div  class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                        </div>
                        <div data-columna="2" class="ColumnasT">
                            <div class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                            <div class="FilasT"><p>&nbsp</p></div>
                        </div>
*/