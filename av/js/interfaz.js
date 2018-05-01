// Definiendo el div principal

const divPrincipal = document.getElementById("principal");

// Declarando botones

let tomar = 0;
let mirar = 0;
let usar = 0;
let seleccion = 0;
objetoi.count = 0;

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
const cnvl = new Audio('nivel.mp3');
const asf = new Audio('seleficha.mp3');

/////// creando niveles /////////////////////////

let nivelArray = new Array;
let contadorNiveles = 0;

function nivelNuevo(nombre, x, y, entrable) {
	
	contadorNiveles++;
	
	nivelArray[contadorNiveles] = {nombre: nombre, x: x, y: y, entrable: entrable};
	
	const nivel = document.createElement("div");
	nivel.className = "nivel";
	
	let nombreNivel = "nivel" + nombre;
	nivel.setAttribute("id", nombreNivel);
	
	const fondo = document.createElement("img");
	fondo.src = "interfaz/fondos/" + nombre + ".png";
	
	nivel.style.visibility = 'hidden';
	
	nivel.appendChild(fondo);
	divPrincipal.appendChild(nivel);
	
}



function nivelIncial(nombre){
	
	let nivel = document.getElementById("nivel" + nombre);
	nivel.style.visibility = 'visible';
	
	nivelActual = nombre;
	
	let coordenadas = conseguirCoordenadas(nombre);
	
	botonesNavegacion(coordenadas.x, coordenadas.y);
	
	
}

function conseguirCoordenadas(nombre){
	
	let i = 1;
	let theX;
	let theY;
	
	while (i <= contadorNiveles) {
		
		if (nivelArray[i].nombre == nombre){
			
			theX = nivelArray[i].x;
			
			theY = nivelArray[i].y;
			
			break;
			
		}
		
		i++;
		
	}
	
	return {x: theX, y: theY}
	
}

function conseguirNombre (x, y) {
	
	let i = 1;
	let nombre;
	
	while (i <= contadorNiveles) {
		
		
		if (nivelArray[i].x == x && nivelArray[i].y == y){
			
			nombre = nivelArray[i].nombre;
			
			return nombre;
			break;
			
		}
		
		i++;
		
	}
		
}

function hacerEntrable(nombre){
	
	let i = 1;

	
	while (i <= contadorNiveles) {
		
		if (nivelArray[i].nombre == nombre){
			
            nivelArray[i].entrable = "entrable";
			
			let coordenadas = conseguirCoordenadas(nivelActual);
			
			botonesNavegacion(coordenadas.x, coordenadas.y);
			
			break;
			
		}
		
		i++;
		
	}
	
}


/////////// cambia nivel{}  //////////////////

let nivelActual = null;

let movilidad = {norte: 0, sur: 0, este: false, oeste: false};

let estadoBotonNorte = 0;
let estadoBotonSur = 0;
let estadoBotonEste = false;
let estadoBotonOeste = false;

function botonesNavegacion(x, y){
	
	testeadorMovilidad(x, y);
	
	
	if (movilidad.oeste == true && estadoBotonOeste == false) {
		
		const botonOeste = document.createElement("input");
		botonOeste.setAttribute("id", "botonOeste")
		botonOeste.setAttribute("type", "image");
		botonOeste.setAttribute("onclick", "cambiaNivel('oeste')");
		botonOeste.src = "interfaz/oestep.png";
		botonOeste.className = "oeste";
		divPrincipal.appendChild(botonOeste);
		
		estadoBotonOeste = true;
		
	}
	
	if (movilidad.oeste == false && estadoBotonOeste == true) {
		
		let boton = document.getElementById("botonOeste")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		estadoBotonOeste = false;
		
	}
	
	if (movilidad.este == true && estadoBotonEste == false) {
		
		const botonEste = document.createElement("input");
		botonEste.setAttribute("type", "image");
		botonEste.setAttribute("id", "botonEste")
		botonEste.setAttribute("onclick", "cambiaNivel('este')");
		botonEste.src = "interfaz/estep.png";
		botonEste.className = "este";
		divPrincipal.appendChild(botonEste);
		
		estadoBotonEste = true;
		
	}
	
	if (movilidad.este == false && estadoBotonEste == true) {
		
		let boton = document.getElementById("botonEste")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		estadoBotonEste = false;
		
	}
	
	if (movilidad.sur == 1 && estadoBotonSur == 0) {
		
		const botonSur = document.createElement("input");
		botonSur.setAttribute("id", "botonSur")
		botonSur.setAttribute("type", "image");
		botonSur.setAttribute("onclick", "cambiaNivel('sur')");
		botonSur.src = "interfaz/surp.png";
		botonSur.className = "sur";
		divPrincipal.appendChild(botonSur);
		
		estadoBotonSur = 1;
		
	}
	
	if (movilidad.sur == 1 && estadoBotonSur == 2) {
		
		let boton = document.getElementById("botonSur")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		const botonSur = document.createElement("input");
		botonSur.setAttribute("id", "botonSur")
		botonSur.setAttribute("type", "image");
		botonSur.setAttribute("onclick", "cambiaNivel('sur')");
		botonSur.src = "interfaz/surp.png";
		botonSur.className = "sur";
		divPrincipal.appendChild(botonSur);
		
		estadoBotonSur = 1;
		
	}
	
	if (movilidad.sur == 2 && estadoBotonSur == 0) {
		
		const botonSur = document.createElement("img");
		botonSur.setAttribute("id", "botonSur")
		botonSur.src = "interfaz/sura.png";
		botonSur.className = "sur";
		divPrincipal.appendChild(botonSur);
		
		estadoBotonSur = 2;
		
	}
	
	if (movilidad.sur == 2 && estadoBotonSur == 1) {
		
		let boton = document.getElementById("botonSur")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		const botonSur = document.createElement("img");
		botonSur.setAttribute("id", "botonSur")
		botonSur.src = "interfaz/sura.png";
		botonSur.className = "sur";
		divPrincipal.appendChild(botonSur);
		
		estadoBotonSur = 2;
		
	}
	
	if (movilidad.sur == 0 && estadoBotonSur != 0) {
		
		let boton = document.getElementById("botonSur")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		estadoBotonSur = 0;
		
	}
	
	///////////////////////////////////////////////////
	
	if (movilidad.norte == 1 && estadoBotonNorte == 0) {
		
		const botonNorte = document.createElement("input");
		botonNorte.setAttribute("id", "botonNorte")
		botonNorte.setAttribute("type", "image");
		botonNorte.setAttribute("onclick", "cambiaNivel('norte')");
		botonNorte.src = "interfaz/nortep.png";
		botonNorte.className = "norte";
		divPrincipal.appendChild(botonNorte);
		
		estadoBotonNorte = 1;
		
	}
	
	if (movilidad.norte == 1 && estadoBotonNorte == 2) {
		
		let boton = document.getElementById("botonNorte")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		const botonNorte = document.createElement("input");
		botonNorte.setAttribute("id", "botonNorte")
		botonNorte.setAttribute("type", "image");
		botonNorte.setAttribute("onclick", "cambiaNivel('norte')");
		botonNorte.src = "interfaz/nortep.png";
		botonNorte.className = "norte";
		divPrincipal.appendChild(botonNorte);
		
		estadoBotonNorte = 1;
		
	}
	
	if (movilidad.norte == 2 && estadoBotonNorte == 0) {
		
		const botonNorte = document.createElement("img");
		botonNorte.setAttribute("id", "botonNorte")
		botonNorte.src = "interfaz/nortea.png";
		botonNorte.className = "norte";
		divPrincipal.appendChild(botonNorte);
		
		estadoBotonNorte = 2;
		
	}
	
	if (movilidad.norte == 2 && estadoBotonNorte == 1) {
		
		let boton = document.getElementById("botonNorte")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		const botonNorte = document.createElement("img");
		botonNorte.setAttribute("id", "botonNorte")
		botonNorte.src = "interfaz/nortea.png";
		botonNorte.className = "norte";
		divPrincipal.appendChild(botonNorte);
		
		estadoBotonNorte = 2;
		
	}
	
	if (movilidad.norte == 0 && estadoBotonNorte != 0) {
		
		let boton = document.getElementById("botonNorte")
		let padre = boton.parentNode
		padre.removeChild(boton);
		
		estadoBotonNorte = 0;
		
	}
	
}

function testeadorMovilidad(x, y) {
	
	
	var ioeste = 1;
	var ieste = 1;
	var inorte = 1;
	var isur = 1;
	
	movilidad.oeste = false;
	movilidad.norte = 0;
	movilidad.sur = 0;
	movilidad.este = false;
	
	while (ioeste <= contadorNiveles) {		
									
		if (nivelArray[ioeste].x == x - 1 && nivelArray[ioeste].y == y) {
			
			movilidad.oeste = true;
     		break;
			
		} 
		
		ioeste++;
		
	}

	while (ieste <= contadorNiveles) {	
									
		if (nivelArray[ieste].x == x + 1 && nivelArray[ieste].y == y) {
			
			movilidad.este = true;
			break;
			
		} 
		
		ieste++;
		
	}

	while (inorte <= contadorNiveles) {	
									
		if (nivelArray[inorte].x == x && nivelArray[inorte].y == y + 1) {
			
			if (nivelArray[inorte].entrable == "entrable"){
			
				movilidad.norte = 1;
			
			}
			
			else {
				
				movilidad.norte = 2;
			
			}
			
			break;
					
		} 
		
		inorte++;
		
	}	

	while (isur <= contadorNiveles) {	
									
		if (nivelArray[isur].x == x && nivelArray[isur].y == y - 1) {
			
			if (nivelArray[isur].entrable == "entrable"){
			
				movilidad.sur = 1;
			
			}
			
			else {
				
				movilidad.sur = 2;
			
			}
			
			break;	
		
		} 
	
		isur++;
	
	}	

}

function cambiaNivel(direccion){
	
	let partida = document.getElementById("nivel" + nivelActual);	
	partida.style.visibility = 'hidden'
	
	let coordenadasPartida = conseguirCoordenadas(nivelActual);
	
	let xLlegada;
	let yLlegada;
	
	if (direccion == "norte") {
		
		xLlegada = coordenadasPartida.x;
		yLlegada = coordenadasPartida.y + 1;
		
	}
	
	if (direccion == "sur") {
		
		xLlegada = coordenadasPartida.x;
		yLlegada = coordenadasPartida.y - 1;
		
	}
	
	if (direccion == "este") {
		
		xLlegada = coordenadasPartida.x + 1;
		yLlegada = coordenadasPartida.y;
		
	}
	
	if (direccion == "oeste") {
		
		xLlegada = coordenadasPartida.x - 1;
		yLlegada = coordenadasPartida.y;
		
	}

	let nombreLlegada = conseguirNombre(xLlegada, yLlegada);
	
	let llegada = document.getElementById("nivel" + nombreLlegada);	
	llegada.style.visibility = 'visible'
	
	nivelActual = nombreLlegada;
	botonesNavegacion(xLlegada, yLlegada);
	
}


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

	else if (mirar == 1) { 
	
		botonmirar.src = "interfaz/mirar.png"; mirar = 0; sunsel.play();
		
		}
	
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

		else if (usar == 1) { 
		
		botonusar.src = "interfaz/usar.png"; usar = 0; sunsel.play();
		
		}
		
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
	
	let nombrenivel = "nivel" + lugar;
	
	let nivel = document.getElementById(nombrenivel);

	nivel.appendChild(boton);
	
	
}

function objetoFondo(nombre, lugar) {
	
	const objeto = document.createElement("img");		
	objeto.src = "interfaz/obj/" + nombre + ".png";
	objeto.className = "objeto" + nombre;
	const nivel = document.getElementById("nivel" + lugar);
	nivel.appendChild(objeto);
	
}

function accion(nombre, juntable) {
		
	if (detener == 0){ 
				
		if (tomar == 1)	{
			
			if (juntable == "tomable"){
					
				let boton = document.getElementById(nombre);
				let lugar = boton.parentNode;
				lugar.removeChild(boton);
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
		asf.play();
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

function eliminarDelNivel(nombre){
	
		let hijo = document.getElementById(nombre);
		let padre = hijo.parentNode;
		padre.removeChild(hijo);
	
}

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
