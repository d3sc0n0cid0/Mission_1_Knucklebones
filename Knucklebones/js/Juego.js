//Variables tabla
    //Tablero
    const tamTablero = 3;
    let jugador; 
    //Lo pongo con var aunque no sea lo común porque es necesario para
    //una función clave y si no tengo que hacer que jugador sea arratrado 
    //por muchas funciones y además necesito que pueda cambiar

//Sustituir el grid por la matriz
function actualizarGridDesdeMatriz(tableroDigital) {
    let tableroVisual;
    if (jugador === false) {tableroVisual = document.getElementById("TableroA");} 
    else {tableroVisual = document.getElementById("TableroB");}

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
function imprimirTablero(tablero) {
    for (let i = 0; i < tamTablero; i++) {
        let fila = ""; // Variable para almacenar la fila actual
        for (let j = 0; j < tamTablero; j++) {
            fila += `[${tablero[i][j] === undefined || tablero[i][j] === null ? " " : tablero[i][j]}]`;
            //Para que imprima el espacio en blanco si no hay número
        }
        console.log(fila); // Imprime la fila completa
    }
    console.log("__________");
}
//Número aleatorio dado (1-6)
function generarTirada() {
    const numDado = Math.round(Math.random()*(6 - 1)+1);
    sustituirDado(numDado);
    return numDado;
}
    //Sustituir dado en grid
function sustituirDado(numDado){
    document.getElementById("Dado").innerHTML = numDado;
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
            //console.log("Valor de data-columna:", numColumStr);

            let numColum = parseInt(numColumStr);
            //console.log("Valor convertido a número:", numColum);

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
//Colocar Dado
function InsertarDadoColumna(dado, columna, tablero){
    for(let j=tamTablero-1;j>=0;j--){
        if(tablero[j][columna]===0){
            tablero[j][columna]=dado;
            actualizarGridDesdeMatriz(tablero) //Ha entrado el dado
            imprimirTablero(tablero);
            return true;
        }
    }
    actualizarGridDesdeMatriz(tablero)
    return false; //Columna llena
}
//Comprobarción con el tablero contrario
function ComprobarTableros(dado, columna, tablero){
    //Comprobar si tiene ese número en la columna
    //Quitar dichos números
    for(let i=0;i<tamTablero;i++){
        if(tablero[i][columna]===dado){ //Tiene ese numero, se borra
            tablero[i][columna]=0;
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
    let filaArray = [[0],[0],[0],[0],[0],[0],[0]];
    for(let columna=0;columna<tamTablero;columna++){//Separamos columnas
        for(let fila=0;fila<tamTablero;fila++){
            let num = tablero[fila][columna];
            filaArray[num] +=1; //Contamos cuanto de cada número hay
        }
        //Ahora confirmamos si ese valor no ha estado antes es decir, si es igual a un número que ya ha aparecido en 
        //La columna, se multiplica por el número de veces que ha aparecido (2,2,2->8)
        for(let i=0;i<=6;i++){
            puntuacionColumna += i * filaArray[i];
        }
        puntuacionTotal+=puntuacionColumna;
        //Reiniciamos para la siguiente columna
        puntuacionColumna=0;
        filaArray = [[0],[0],[0],[0],[0],[0],[0]]; 
    }
    console.log("Puntuación Final:");
    console.log(puntuacionTotal);
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

//Partida
async function partida(){ //Asyc para que funcione el await
    //Lo que está más tabulado son para que funcione desde consola debido a que son ayuda para mi al programar
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
    while(!partidaAcabada){//Tablero lleno
        //Cambio de turno al otro jugador
        jugador= !jugador;
        turnoDe();

        //El jugador coloca el dado que le ha tocado
            //Dado que le toca
        dado = generarTirada();
            //Colocar Dado
        do{
            columna = await selecColumna();
                 //console.log(columna);
            columnaLlena = InsertarDadoColumna(dado, columna, tableros[Number(jugador)]) //Me daba error si no cambiaba a un number
        }while(columnaLlena===false);
        
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
function reiniciarPartida(){
    location.reload(); 
}
/////////////////////////////////////////////////////
//Cosas visuales del tablero
//Selector de turno
function turnoDe(){
    turno = document.getElementById("selectorTurno");
    if(jugador===false){turno.innerHTML = "Turno de jugador A";}
    else{turno.innerHTML = "Turno de jugador B";}
}
function mostrarPuntuacion(num){
    if (jugador === false) {puntuacion = document.getElementById("puntuacionA");} 
    else {puntuacion = document.getElementById("puntuacionB");}
    puntuacion.innerHTML = `Puntuación: ${num}`; 
}
function ganador(){
    jugadorGanador = document.getElementById("selectorGanador");
    jugadorGanador.style.display="block";

    if(jugador===false){jugadorGanador.innerHTML = "Ha ganado el jugador A";}
    else{jugadorGanador.innerHTML = "Ha ganado el jugador B";}
}
/////////////////////////////////////////////////////
//Música Fondo
    //Música variables
const musicaFondo = new Audio("../Knucklebones/Assets/sfx/Cult of the Lamb [Official] - Knucklebones - River Boy (youtube).mp3");
musicaFondo.loop = true;
let musicOn = true;
const fondoBotonMusica = document.getElementById("BotonMusica");

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
    partida();
}

// Llamar a main cuando la página cargue
window.onload = main;