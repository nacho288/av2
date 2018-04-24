// Definiendo el div principal

var divPrincipal = document.getElementById("principal");

// Declarando botones

var tomar = 0;
var mirar = 0;
var usar = 0;

/// Freno de acciones

var detener = 0;

// Declarando musica

var audio = new Audio('turu.mp3');
var sabrir = new Audio('abrir cuadro.mp3');
var scerrar = new Audio('cerrar cuadro.mp3');
var ssel = new Audio('sel.mp3');
var sunsel = new Audio('unsel.mp3');

/////////// elbotondetomar{}  //////////////////

var botontomar = document.createElement("input");
botontomar.setAttribute("type", "image");
botontomar.setAttribute("onclick", "tomartomar()");
botontomar.src = "interfaz/tomar.png";
botontomar.className = "tomar";

divPrincipal.appendChild(botontomar);


function tomartomar() {
	
if (detener == 0){ 
	
	if (tomar == 0) { 
		
		botontomar.src = "interfaz/tomarp.png"; tomar = 1;
		botonmirar.src = "interfaz/mirar.png"; mirar = 0;
		botonusar.src = "interfaz/usar.png"; usar = 0;
		ssel.play();
		
		}

	else if (tomar == 1) { botontomar.src = "interfaz/tomar.png"; tomar = 0; sunsel.play();}
	
}

}

//////////// elbotondemirar(){} ////////////////////

var botonmirar = document.createElement("input");
botonmirar.setAttribute("type", "image");
botonmirar.setAttribute("onclick", "mirarmirar()");
botonmirar.src = "interfaz/mirar.png";
botonmirar.className = "mirar";

divPrincipal.appendChild(botonmirar);

function mirarmirar() {
	
if (detener == 0){ 
	
	if (mirar == 0) { 
		
		botonmirar.src = "interfaz/mirarp.png"; mirar = 1;
		botontomar.src = "interfaz/tomar.png"; tomar = 0;
		botonusar.src = "interfaz/usar.png"; usar = 0;
		ssel.play();
		
		}

	else if (mirar == 1) { botonmirar.src = "interfaz/mirar.png"; mirar = 0; sunsel.play();}
	
}

}

//////////// elbotondeusar(){} ////////////////////

var botonusar = document.createElement("input");
botonusar.setAttribute("type", "image");
botonusar.setAttribute("onclick", "usarusar()");
botonusar.src = "interfaz/usar.png";
botonusar.className = "usar";

divPrincipal.appendChild(botonusar);

function usarusar() {
	
if (detener == 0){ 
	
	if (usar == 0) { 
		
		botonusar.src = "interfaz/usarp.png"; usar = 1;
		botonmirar.src = "interfaz/mirar.png"; mirar = 0;
		botontomar.src = "interfaz/tomar.png"; tomar = 0;
		ssel.play();
		
		}

	else if (usar == 1) { botonusar.src = "interfaz/usar.png"; usar = 0; sunsel.play();}
	
}

}


///////// Declarando inventario//////////////

var inventa = new Array;

// Generadores de objetos 

function objeto(nombre) {
	
var boton = document.createElement("input");

boton.setAttribute("type", "image");

boton.setAttribute("id", nombre);

var acciondir = "accion('" + nombre + "')";

boton.setAttribute("onclick", acciondir);

boton.src = "interfaz/obj/" + nombre + ".png";
boton.className = "objeto" + nombre;

divPrincipal.appendChild(boton);
	
}

function accion(nombre) {
		
	if (detener == 0){ 
				
		if (tomar == 1)					
		{
		
			var boton = document.getElementById(nombre);
			divPrincipal.removeChild(boton);
			tomar = 0;				
			botontomar.src = "interfaz/tomar.png";
			audio.play();					
			var tomado = new objetoi(nombre);
			
			
		}				
		
		if (mirar == 1) {
			
			mirar = 0;				
			botonmirar.src = "interfaz/mirar.png";
			sabrir.play();
							
			cuadromirar(nombre);
								
			
			
		}
		
		if (usar == 1) {
			
			usar = 0;				
			botonusar.src = "interfaz/usar.png";
			sabrir.play();
							
			cuadrousar(nombre);
								
			
			
		}
		
		}
				
}

function cuadromirar(nombre) {
	
	detener = 1;
	
	var cuadrin = document.createElement("div");
	cuadrin.className = "textines";
	cuadrin.setAttribute("id", "m" + nombre);
	
	var texto1 = document.createElement("p");
	texto1.textContent = descrip(nombre);
	texto1.className = "letras";

	divPrincipal.appendChild(cuadrin);
	cuadrin.appendChild(texto1);
					
	var sacardir = "sacarcuadro('m" + nombre + "')";
    cuadrin.setAttribute("onclick", sacardir);
	
	
}

function cuadrousar(nombre) {
	
	detener = 1;
	
	var cuadrin = document.createElement("div");
	cuadrin.className = "textines";
	cuadrin.setAttribute("id", "u" + nombre);
	
	var texto1 = document.createElement("p");
	texto1.textContent = "no se que queres que haga";
	texto1.className = "letras";

	divPrincipal.appendChild(cuadrin);
	cuadrin.appendChild(texto1);
					
	var sacardir = "sacarcuadro('u" + nombre + "')";
    cuadrin.setAttribute("onclick", sacardir);
	
	
}

function sacarcuadro(nombre) {
	
	var cuadro = document.getElementById(nombre);
	divPrincipal.removeChild(cuadro);
	scerrar.play();	
	detener = 0;
	
}




// Generadores de fichas de invetario

function objetoi(nombre) {
	
objetoi.count++;

inventa[objetoi.count] = nombre;

var boton = document.createElement("input");

boton.setAttribute("type", "image");
boton.setAttribute("id", nombre);

var numero = objetoi.count;


var eliminardir = "eliminar('" + nombre + "')";

boton.setAttribute("onclick", eliminardir);

boton.src = "interfaz/obj/" + nombre + "-o.png";
boton.className = "objeto" + objetoi.count + "o";

divPrincipal.appendChild(boton);


				
}

function eliminar(nombre) {
	
	var botone = document.getElementById(nombre);
	divPrincipal.removeChild(botone);							
	
	var a = 0;
	while (a <8) { 

		a++;
		test = inventa[a];
		
		if (test == nombre) { 

			inventa[a]= null;

		} 
		
		
	}
	
	objetoi.count--;
	inventario();
	} 


objetoi.count = 0;

// ordenador de inventario

function inventario() {
	
	var a = 1;
	var test;
	var test2; 
	var elqsigue;
	
	while (a <8) { 
	
	
	
	test = inventa[a];
	
	
	if (test == null || test == undefined){
		
			elquesigue = a + 1;		
			test2 = inventa[elquesigue];
			
			if (test2 != null || test2 != undefined){
				
				var amover = document.getElementById(test2);
				amover.className = "objeto" + a + "o";
				inventa[elquesigue] = null;
				inventa[a] = test2;
			}
		
		}
		
		a++;
		
	}

	} 

// ------ Descripciones ------------

function descrip(nombre) {
	
	if (nombre == "a") {return "Esto es una letra A de color verde";}
	if (nombre == "b") {return "Esto es una letra B de color amarillo";}
	if (nombre == "c") {return "Esto es una letra C de color azul";}
	if (nombre == "d") {return "Esto es una letra D de color rojo";}
	if (nombre == "e") {return "Esto es una letra E de color celeste";}
	if (nombre == "f") {return "Esto es una letra F de color naranja";}
	if (nombre == "g") {return "Esto es una letra G de color rosa";}
	if (nombre == "h") {return "Esto es una letra H de color violeta";}
	if (nombre == "llave") {return "Esto es una llave";}
	
	
}

// ------ Generando objetos ------------


var objetoa = new objeto("a");
var objetob = new objeto("b");
var objetoc = new objeto("c");
var objetod = new objeto("d");
var objetoe = new objeto("e");
var objetof = new objeto("f");
var objetog = new objeto("g");
var objetoh = new objeto("h");

// var objetollave = new objeto("llave");


