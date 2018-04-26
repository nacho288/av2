// Definiendo el div principal

const divPrincipal = document.getElementById("principal");

// Declarando botones

let tomar = 0;
let mirar = 0;
let usar = 0;
let seleccion = 0;

/// seleccionados para usar

let usaro1 = null;
let usaro2 = null;

/// Freno de acciones

let detener = 0;

// Declarando musica

const audio = new Audio('turu.mp3');
const sabrir = new Audio('abrir cuadro.mp3');
const scerrar = new Audio('cerrar cuadro.mp3');
const ssel = new Audio('sel.mp3');
const sunsel = new Audio('unsel.mp3');

/////////// elbotondetomar{}  //////////////////

const botontomar = document.createElement("input");
botontomar.setAttribute("type", "image");
botontomar.setAttribute("onclick", "tomartomar()");
botontomar.src = "interfaz/tomar.png";
botontomar.className = "tomar";

divPrincipal.appendChild(botontomar);


function tomartomar() {
	
	if (detener == 0 && usaro1 == null){ 
	
		
		if (tomar == 0) { 
			
			botontomar.src = "interfaz/tomarp.png"; tomar = 1;
			botonmirar.src = "interfaz/mirar.png"; mirar = 0;
			botonusar.src = "interfaz/usar.png"; usar = 0;
			ssel.play();
			
			}

		else if (tomar == 1) { 
		
			botontomar.src = "interfaz/tomar.png"; tomar = 0; sunsel.play();
		
		}
		
	}

}

//////////// elbotondemirar(){} ////////////////////

const botonmirar = document.createElement("input");
botonmirar.setAttribute("type", "image");
botonmirar.setAttribute("onclick", "mirarmirar()");
botonmirar.src = "interfaz/mirar.png";
botonmirar.className = "mirar";

divPrincipal.appendChild(botonmirar);

function mirarmirar() {
	
if (detener == 0 && usaro1 == null){ 
	
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

const botonusar = document.createElement("input");
botonusar.setAttribute("type", "image");
botonusar.setAttribute("onclick", "usarusar()");
botonusar.src = "interfaz/usar.png";
botonusar.className = "usar";

divPrincipal.appendChild(botonusar);

function usarusar() {
	
if (detener == 0 && usaro1 == null){ 
	
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

let inventa = new Array;

// Generadores de objetos 


function objeto(nombre, juntable, lugar) {
	
	const boton = document.createElement("input");
	boton.setAttribute("type", "image");
	boton.setAttribute("id", nombre);

	const acciondir = "accion('" + nombre + "', '" + juntable + "')";
	boton.setAttribute("onclick", acciondir);

	boton.src = "interfaz/obj/" + nombre + ".png";
	boton.className = "objeto" + nombre;

	divPrincipal.appendChild(boton);
	
}



function accion(nombre, juntable) {
		
	if (detener == 0){ 
				
		if (tomar == 1)	{
			
			if (juntable == "tomable"){
					
				let boton = document.getElementById(nombre);
				divPrincipal.removeChild(boton);
				tomar = 0;				
				botontomar.src = "interfaz/tomar.png";
				audio.play();					
				let tomado = new objetoi(nombre);
				
			}
			
			else if (juntable != "tomable") {
				
				tomar = 0;				
				botontomar.src = "interfaz/tomar.png";
				cuadromirar("notomar");
				
			}
		

			
			
		}				
		
		if (mirar == 1) {
			
			mirar = 0;				
			botonmirar.src = "interfaz/mirar.png";									
			cuadromirar(nombre);			
			
		}
		
		if (usar == 1) {
			

			usaro2 = nombre;
			accionUsar();
			
			
			
		}
	
	}

}

function accionUsar() {
	
	let parte1;
	
	if (usaro1 == null) {parte1 = "";}
	else {
		parte1 = usaro1 
		selecFicha();
		
		}
		
	let parte2 = usaro2;
	
	let combinacion = parte1 + parte2;
	
	console.log(combinacion);
	
	funcionesUsar(combinacion);
	
	usaro1 = null;
	usaro2 = null;
	
	usar = 0;				
	botonusar.src = "interfaz/usar.png";

	
}

function cuadromirar(nombre) {
	
	detener = 1;
	sabrir.play();
	
	const cuadrin = document.createElement("div");
	cuadrin.className = "textines";
	cuadrin.setAttribute("id", "m" + nombre);
	
	const texto1 = document.createElement("p");
	texto1.textContent = descrip(nombre);
	texto1.className = "letras";

	divPrincipal.appendChild(cuadrin);
	cuadrin.appendChild(texto1);
					
	const sacardir = "sacarcuadro('m" + nombre + "')";
    cuadrin.setAttribute("onclick", sacardir);
	
	
}

function cuadrousar(nombre) {
	
	detener = 1;
	
	const cuadrin = document.createElement("div");
	cuadrin.className = "textines";
	cuadrin.setAttribute("id", "u" + nombre);
	
	const texto1 = document.createElement("p");
	texto1.textContent = "no se que queres que haga";
	texto1.className = "letras";

	divPrincipal.appendChild(cuadrin);
	cuadrin.appendChild(texto1);
					
	const sacardir = "sacarcuadro('u" + nombre + "')";
    cuadrin.setAttribute("onclick", sacardir);
	
	
}

function sacarcuadro(nombre) {
	
	const cuadro = document.getElementById(nombre);
	divPrincipal.removeChild(cuadro);
	scerrar.play();	
	detener = 0;
	
}




// Generadores de fichas de invetario

function objetoi(nombre) {
	
objetoi.count++;

inventa[objetoi.count] = nombre;

const boton = document.createElement("input");

boton.setAttribute("type", "image");
boton.setAttribute("id", nombre);

let numero = objetoi.count;


const accdir = "accionficha('" + nombre + "')";

boton.setAttribute("onclick", accdir);

boton.src = "interfaz/obj/" + nombre + "-o.png";
boton.className = "objeto" + objetoi.count + "o";

divPrincipal.appendChild(boton);


				
}

function accionficha(nombre){
	
	if (detener == 0){
	
		if (usar == 1) {
			
			if (usaro1 == null) { 
		
				let a = 0;
				while (a <8) { 

					a++;
					test = inventa[a];
					
					if (test == nombre) { 
					
						selecFicha(nombre, a);
						
					} 		
					
				}

		
			
			}
			
			else {
			
				usaro2 = nombre;
				accionUsar();
				
				
			}
		
		}
		
		if (mirar == 1) {
			
			mirar = 0;
			botonmirar.src = "interfaz/mirar.png";
			cuadromirar(nombre);
					
		}
	
	}

	
}

function selecFicha(nombre, a) {
	
	if (seleccion == 0){
		
		seleccion = 1;
		const imgsele = document.createElement("input");
		imgsele.setAttribute("type", "image");			
		imgsele.src = "interfaz/fichasel.png";
		imgsele.setAttribute("id", "pepito");
		imgsele.className = "objeto" + a + "o";
		divPrincipal.appendChild(imgsele);
		
		usaro1 = nombre;
	
	}
	
	else if (seleccion == 1) {
		
		seleccion = 0;
		const botone = document.getElementById("pepito");
		divPrincipal.removeChild(botone);			
		
	}
	
}

function eliminar(nombre) {
	
	const botone = document.getElementById(nombre);
	divPrincipal.removeChild(botone);							
	
	let a = 0;
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
	
	let a = 1;
	let test;
	let test2; 
	let elqsigue;
	
	while (a <8) { 
	
	
	
	test = inventa[a];
	
	
	if (test == null || test == undefined){
		
			elquesigue = a + 1;		
			test2 = inventa[elquesigue];
			
			if (test2 != null || test2 != undefined){
				
				const amover = document.getElementById(test2);
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
	if (nombre == "llave") {return "Esto es una llave mal dibujada";}
	if (nombre == "cofre") {return "Un cofre sucio cerrado";}
	if (nombre == "puerta") {return "Una puerta cerrada";}
	
	if (nombre == "ab") {return "La mezcla magica";}
	if (nombre == "nadausar") {return "No te entiendo";}
	if (nombre == "cofreu") {return "cofre abierto, tiene una llave";}
	if (nombre == "puertaa") {return "Puerta abierta";}
	
	if (nombre == "notomar") {return "No puedo agarrar eso";}
	
}

// ------ Funciones de Usar ------------

function funcionesUsar(codigo) {
	
	if (codigo == "ab") {
		
		cuadromirar("ab");
		
	}
	
	else if (codigo == "puerta") {
	
	cuadromirar("puerta");
		
	}

	else if (codigo == "cofre") {
		
		let boton = document.getElementById("cofre");
		divPrincipal.removeChild(boton);
		
		const cofrea = document.createElement("img");		
		cofrea.src = "interfaz/obj/cofrea.png";
		cofrea.className = "objetocofrea";
		divPrincipal.appendChild(cofrea);
		
	
		let objetollave = new objeto("llave", "tomable", "casa");
		
		cuadromirar("cofreu");
		
	}
	
	else if (codigo == "llavepuerta") {
	
		let boton = document.getElementById("puerta");
		divPrincipal.removeChild(boton);
		
		const puertaa = document.createElement("img");		
		puertaa.src = "interfaz/obj/puertaa.png";
		puertaa.className = "objetopuerta";
		divPrincipal.appendChild(puertaa);
		
		eliminar("llave");
		
		cuadromirar("puertaa");
		
	
	}
	
	else { cuadromirar("nadausar"); } 
	
}

// ------ Generando objetos ------------


// let objetoa = new objeto("a");
// let objetob = new objeto("b");
// let objetoc = new objeto("c");
// let objetod = new objeto("d");
// let objetoe = new objeto("e");
// let objetof = new objeto("f");
// let objetog = new objeto("g");
// let objetoh = new objeto("h");



let objetocofre = new objeto("cofre", "noTomable", "casa");
let objetopuerta = new objeto("puerta", "noTomable", "casa");


