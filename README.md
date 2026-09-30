# Despertar del DOM
Trabajo realizado por Adriana Remiro Autric.
## Descripción
Despertar del DOM es un menú y el juego del Knucklebones.

El cual consta de ganar a tu adversario en número de puntos apartir de haciendo columnas de dados 
multiplicamdo su valor y eliminando los dados enemigos. Al acabar se calcula las puntuaciones

## Cómo ejecutar el proyecto

1. Clonar o descargar el repositorio.
2. Abrir la carpeta del proyecto.
3. Abrir `Knucklebones.html` en un navegador.
4. Pulsar `Jugar` para comenzar una partida.

No es necesario instalar ninguna dependencia.

## Funcionamiento

- El tablero 3x3 se genera dinámicamente mediante JavaScript, puede cambiarse su tamaño pulsando 
la tecla "+" una vez comienza la partida.
- En cada ronda se tira un dado del cual sale un valor aleatorio entre 1 y 6.
- El jugador debe colocar el dado en una columna libre para finalizar su turno.
- Si en la misma columa esté el mismo dado el valor de este se elevará al número de repeticiones
correspondiente. A su vez si colocas un dado en una columna donde el contarrio tenga colocado un dado eliminarás todas las instancias del ese dado en el tablero contrario.
- Al finalizar cada turno se calcula el número de puntos de cada jugador y finalmente
gana el que obtenga una puntuación mayor.
- Pulsando la tecla `L` se activa o desactiva el modo oscuro.


## Uso de IA
Qué partes hiciste con IA y con qué herramienta, 1-2 prompts reales relevantes, 
cómo verificaste lo generado y qué escribiste a mano. Si no usaste IA, dilo y listo.

Usé Ecosia AI y geminai como apoyo de programación.

Uso principal para control de errores o dudas, ahora abajo muestro para que lo usé más aparte de 
por estas razones:

//1.
Await y promise.
No puedo poner un solo promp porque fue una conversación muy larga, pero en resumidas cuentas.
Estaba trabajando solo en la consola para crear la lógica de los tablero y todo iba perfectamente hasta que
llegó la parte de insertar los valores en la columna, cree event listeners para que vieran cuando le daba click.
Pero por alguna razón no me llegaban a funcionar del todo, se los pasaba la lógica de la partida.
Estuve preguntando a la IA y comenzó a hablarme de cosas que no tenían mucho que ver con lo que estba haciendo en el momento. Tras mucho debatir me acabó hablando del await y del promise como forma de que el programa se "parase"
cuando llegara a esa parte y que no se pasase.
Así que al final lo adopté y lo utilicé.

//2.
Generar el tablero de forma dinámica.
Le pedi a la IA ""Ayudame a entender como crear el tablero de forma dinámica" y le pasé cómo
había hecho los tableros en el html, lo que más temía era confundirme haciendo las etiquetas entonces quería ver si había entendido correctamente las páginas web que había visto. Porque inicialmente no me funcionaba

///////////////////
## Autopsia
Las 2 decisiones más discutibles de tu código y qué alternativa descartaste en cada una.
### 1.
Quería hacer que en alguna perte de la página hubiera un texto que se moviera, entonces
investigando encontré que existía "Marquee", que era justo lo que quería, pero era un lenguaje
obsoleto pero que aún funcionaba auqnue podían quitarlo en cualquier momento.
Seguí investigando y decubrí que se podía hacer por css. Pero era bastante más tedioso.
Estuve dándole unas vueltas y finalmente me decidí por la segunda para aprender cómo hacerlo 
y así no tener que descubrir un día que ya no funcionaba.
Lamentablemente para mi no acabé logrando que funcionara como yo quería, debido a que el texto
se quedaba pillado, así que decidí usar keyframes cómo si se tratase de una imagen.
Que era algo más sencillo (a mi parecer)
### 2. 
Quería hacer que el tablero fuera seleccionable, es decir que los jugadores pudieran elegir el tamaño
del que querían el tablero. Pero al final me pareció algo más tedioso y además chocaba bastante con la 
visión que tenía para cómo se vería de forma visual el juego, porque cómo tengo dos personajes que reaccionan 
a lo que pasa con cada tablero si los hacía más grandes o pequeños quedaba feo. Ahora se puede cambiar pero no por la parte de la página web de forma obvia tienes que pulsar la tecla +, para que te salga un alert al que le metes el tamaño de la tabla

## Extra, páginas web de donde he sacado imágenes/Assets:

### Información
    Uso de apuntes de primero de la carrera
https://developer.mozilla.org/es/docs/Learn_web_development
https://es.stackoverflow.com/
https://www.freecodecamp.org/espanol/news/codigo-de-enlace-html-como-insertar-un-enlace-a-un-sitio-web-con-href/
https://aracnibot.blogspot.com/2014/12/partes-del-body-html5.html
https://www.piensasolutions.com/blog/como-hacer-una-pagina-web-en-html-guia-paso-a-paso-para-principiantes#tree-5
https://www.youtube.com/watch?v=1qBl19BmdB8
https://www.espai.es/blog/2025/09/como-hacer-un-modo-oscuro-solo-con-html-y-css/
https://www.youtube.com/watch?v=YRrp-h0ZF30
https://www.freecodecamp.org/espanol/news/como-cambiar-la-tipografia-en-html/
https://www.youtube.com/watch?v=xq_pfICK37g
http://html.conclase.net/w3c/html401-es/present/graphics.html
https://www.boardinfinity.com/blog/mastering-html-and-css-from-fundamentals-to-advanced-techniques/
https://www.reddit.com/r/webdev/comments/j91v3q/how_do_i_remove_bullet_points_from_ul_and_li/?tl=es-es
https://www.silocreativo.com/neumorfismo-disenando-botones-con-css/
https://lorca.act.uji.es/asignatura/e08/ayudas/tutorial_html/ew_113.htm  
https://www.freecodecamp.org/espanol/news/como-usar-html-para-abrir-un-link-en-un-tab-nuevo/
https://www.youtube.com/watch?v=WD039DKsdyI
https://es.stackoverflow.com/questions/592227/c%C3%B3mo-cambiar-el-cursor-en-javascript-para-que-tome-la-forma-de-una-imagen  
https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay
https://www.w3schools.com/jsref/prop_style_backgroundimage.asp
https://www.w3schools.com/js/js_api_pointer_events.asp
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://www.w3schools.com/html/html_lists_ordered.asp
https://www.youtube.com/watch?v=fI-VZwIFtwI
https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
https://developer.mozilla.org/es/docs/Web/API/Document/querySelector
https://www.youtube.com/watch?v=JhLa1bpzNVM
https://es.stackoverflow.com/questions/132992/array-bidimensional-javascript
https://programacionymas.com/blog/super-console-log-javascript
https://lenguajecss.com/css/bordes/border/
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/await
https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
https://es.stackoverflow.com/questions/142132/como-hacer-un-sleep-en-javascript
https://www.youtube.com/shorts/n5oDvod1Qik
https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export
https://developer.mozilla.org/es/docs/Web/API/Window/setInterval
https://developer.mozilla.org/es/docs/Web/API/Window/setTimeout
https://www.luisllamas.es/en/insert-and-remove-elements-from-the-dom-javascript/
https://developer.mozilla.org/es/docs/Web/API/Element/classList
https://es.javascript.info/alert-prompt-confirm

### Assets:
Algunos creados/editados por mi:

https://www.dafont.com/es/triforce.font?text=cult+of+the+lamb
https://www.youtube.com/watch?v=y4PfvZiEs5E
https://shared.akamai.steamstatic.com/community_assets/images/items/1313140/c80d1a3ea315f69f72cbb77bffe42c5ed0f7b945.mp4
https://cultivis.netlify.app/
https://cult-of-the-lamb.fandom.com/wiki/Category:Images
https://www.gameuidatabase.com/gameData.php?id=1549
