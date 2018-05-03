
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

        eliminarDelNivel(codigo);

        objetoFondo("cofrea", "pieza");

        let objetollave = new objeto("llave", "tomable", "pieza");

        cuadromirar("cofreu");

    }

    else if (codigo == "llavepuerta") {


        eliminarDelNivel("puerta");

        objetoFondo("puertaa", "entrada");


        eliminar("llave");

        cambiarEntrabilidad("fin", "0100")

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

let nivelPieza = nivelNuevo("pieza", 3, 2, "1001");
let nivelEntrada = nivelNuevo("entrada", 2, 2, "1011");
let nivelrelleno1 = nivelNuevo("relleno1", 3, 3, "0100");
let nivelrelleno2 = nivelNuevo("relleno2", 1, 2, "1010");
let nivelrelleno3 = nivelNuevo("relleno3", 1, 3, "0100");
let nivelfin = nivelNuevo("fin", 2, 3, "0200");

nivelIncial("entrada");

let objetocofre = new objeto("cofre", "noTomable", "pieza");
let objetopuerta = new objeto("puerta", "noTomable", "entrada");


