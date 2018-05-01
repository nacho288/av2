// Definiendo el div principal

const divPrincipal = document.getElementById('principal')

// Declarando botones

let tomar = 0
let mirar = 0
let usar = 0
let seleccion = 0
objetoi.count = 0

// / seleccionados para usar

let usaro1 = null
let usaro2 = null

// / Freno de acciones

let detener = 0

// Declarando musica

const audio = new Audio('turu.mp3')
const sabrir = new Audio('abrir cuadro.mp3')
const scerrar = new Audio('cerrar cuadro.mp3')
const ssel = new Audio('sel.mp3')
const sunsel = new Audio('unsel.mp3')
const cnvl = new Audio('nivel.mp3')
const asf = new Audio('seleficha.mp3')

// ///// creando niveles /////////////////////////

let nivelArray = []
let contadorNiveles = 0

function nivelNuevo (nombre, x, y, entrable) {
  contadorNiveles++
  nivelArray.push({ nombre, x, y, entrable })

  const nuevoNivel = `
    <div class="nivel" id="nivel${nombre}" style="display: hidden">
        <img src="interfaz/fondos/${nombre}.png" />
    </div>`

  divPrincipal.insertAdjacentHTML('afterbegin', nuevoNivel)
}

function nivelIncial (nombre) {
  let nivel = document.getElementById('nivel' + nombre)
  nivel.style.visibility = 'visible'

  nivelActual = nombre

  let { x, y } = conseguirCoordenadas(nombre)

  botonesNavegacion(x, y)
}

function conseguirCoordenadas (nombre) {
  const nivelBuscado = nivelArray.find(nivel => nivel.nombre === nombre)
  if (nivelBuscado) {
    return { x: nivelBuscado.x, y: nivelBuscado.y }
  }
  throw Error('Nivel no encontrado en el array de niveles', nombre)
}

function conseguirNombre (x, y) {
  const nivelBuscado = nivelArray.find(nivel => nivel.x === x && nivel.y === y)
  if (nivelBuscado) return nivelBuscado.nombre

  throw Error('Nivel no encontrado en el array de niveles')
}

function hacerEntrable (nombre) {
  const index = nivelArray.findIndex(nivel => nivel.nombre === nombre)
  if (index === -1) throw Error('Nivel no encontrado en el array de niveles')

  nivelArray[index].entrable = 'entrable'

  let coordenadas = conseguirCoordenadas(nivelActual)
  botonesNavegacion(coordenadas.x, coordenadas.y)
}

// ///////// cambia nivel{}  //////////////////

let nivelActual = null

let movilidad = { norte: 0, sur: 0, este: false, oeste: false }

let estadoBotonNorte = 0
let estadoBotonSur = 0
let estadoBotonEste = false
let estadoBotonOeste = false

function crearBotonNavegacion (orientacion, prendido) {
  const mini = orientacion.toLowerCase()
  const capi = orientacion[0].toUpperCase() + mini.substring(1)
  const estado = prendido ? 'p' : 'a'
  if (prendido) {
    return `<input id="boton${capi}" type="image" onclick="cambiaNivel('${mini}')" src="interfaz/${mini}${estado}.png" class="${mini}"/>`
  }
  return `<img src="interfaz/${mini}${estado}.png" id="boton${capi}" class="${mini}"/>`
}

function botonesNavegacion (x, y) {
  testeadorMovilidad(x, y)

  if (movilidad.oeste == true && estadoBotonOeste == false) {
    const botonOeste = crearBotonNavegacion('oeste', true)
    divPrincipal.insertAdjacentHTML('afterbegin', botonOeste)
    estadoBotonOeste = true
  }

  if (movilidad.oeste == false && estadoBotonOeste == true) {
    let boton = document.getElementById('botonOeste')
    let padre = boton.parentNode
    padre.removeChild(boton)

    estadoBotonOeste = false
  }

  if (movilidad.este == true && estadoBotonEste == false) {
    const botonEste = crearBotonNavegacion('este', true)
    divPrincipal.insertAdjacentHTML('afterbegin', botonEste)
    estadoBotonEste = true
  }

  if (movilidad.este == false && estadoBotonEste == true) {
    let boton = document.getElementById('botonEste')
    let padre = boton.parentNode
    padre.removeChild(boton)

    estadoBotonEste = false
  }

  if (movilidad.sur == 1 && estadoBotonSur == 0) {
    const botonSur = crearBotonNavegacion('sur', true)
    divPrincipal.insertAdjacentHTML('afterbegin', botonSur)

    estadoBotonSur = 1
  }

  if (movilidad.sur == 1 && estadoBotonSur == 2) {
    let boton = document.getElementById('botonSur')
    let padre = boton.parentNode
    padre.removeChild(boton)

    const botonSur = crearBotonNavegacion('sur', true)
    divPrincipal.insertAdjacentHTML('afterbegin', botonSur)

    estadoBotonSur = 1
  }

  if (movilidad.sur == 2 && estadoBotonSur == 0) {
    const botonSur = crearBotonNavegacion('sur', false)
    divPrincipal.insertAdjacentHTML('afterbegin', botonSur)

    estadoBotonSur = 2
  }

  if (movilidad.sur == 2 && estadoBotonSur == 1) {
    let boton = document.getElementById('botonSur')
    let padre = boton.parentNode
    padre.removeChild(boton)

    const botonSur = crearBotonNavegacion('sur', false)
    divPrincipal.insertAdjacentHTML('afterbegin', botonSur)

    estadoBotonSur = 2
  }

  if (movilidad.sur == 0 && estadoBotonSur != 0) {
    let boton = document.getElementById('botonSur')
    let padre = boton.parentNode
    padre.removeChild(boton)

    estadoBotonSur = 0
  }

    // /////////////////////////////////////////////////

  if (movilidad.norte == 1 && estadoBotonNorte == 0) {
    const botonNorte = document.createElement('input')
    botonNorte.setAttribute('id', 'botonNorte')
    botonNorte.setAttribute('type', 'image')
    botonNorte.setAttribute('onclick', "cambiaNivel('norte')")
    botonNorte.src = 'interfaz/nortep.png'
    botonNorte.className = 'norte'
    divPrincipal.appendChild(botonNorte)

    estadoBotonNorte = 1
  }

  if (movilidad.norte == 1 && estadoBotonNorte == 2) {
    let boton = document.getElementById('botonNorte')
    let padre = boton.parentNode
    padre.removeChild(boton)

    const botonNorte = document.createElement('input')
    botonNorte.setAttribute('id', 'botonNorte')
    botonNorte.setAttribute('type', 'image')
    botonNorte.setAttribute('onclick', "cambiaNivel('norte')")
    botonNorte.src = 'interfaz/nortep.png'
    botonNorte.className = 'norte'
    divPrincipal.appendChild(botonNorte)

    estadoBotonNorte = 1
  }

  if (movilidad.norte == 2 && estadoBotonNorte == 0) {
    const botonNorte = document.createElement('img')
    botonNorte.setAttribute('id', 'botonNorte')
    botonNorte.src = 'interfaz/nortea.png'
    botonNorte.className = 'norte'
    divPrincipal.appendChild(botonNorte)

    estadoBotonNorte = 2
  }

  if (movilidad.norte == 2 && estadoBotonNorte == 1) {
    let boton = document.getElementById('botonNorte')
    let padre = boton.parentNode
    padre.removeChild(boton)

    const botonNorte = document.createElement('img')
    botonNorte.setAttribute('id', 'botonNorte')
    botonNorte.src = 'interfaz/nortea.png'
    botonNorte.className = 'norte'
    divPrincipal.appendChild(botonNorte)

    estadoBotonNorte = 2
  }

  if (movilidad.norte == 0 && estadoBotonNorte != 0) {
    let boton = document.getElementById('botonNorte')
    let padre = boton.parentNode
    padre.removeChild(boton)

    estadoBotonNorte = 0
  }
}

function testeadorMovilidad (x, y) {
  movilidad.oeste = false
  movilidad.norte = 0
  movilidad.sur = 0
  movilidad.este = false

    // manejas movilidad OESTE
  const indexOeste = nivelArray.findIndex(nivel => nivel.x === x - 1 && nivel.y === y)
  movilidad.oeste = indexOeste !== -1

    // manejas movilidad ESTE
  const indexEste = nivelArray.findIndex(nivel => nivel.x === x - 1 && nivel.y === y)
  movilidad.este = indexEste !== -1

    // manejas movilidad NORTE
  const indexNorte = nivelArray.findIndex(nivel => nivel.x === x && nivel.y === y + 1)
  if (indexNorte === -1) {
      // no encontrado
    movilidad.norte = 0
  } else if (nivelArray[indexNorte].entrable === 'entrable') {
      // encontrado y entrable
    movilidad.norte = 1
      // encontrado y no entrable
  } else {
    movilidad.norte = 2
  }

    // manejas movilidad SUR
  const indexSur = nivelArray.findIndex(nivel => nivel.x === x && nivel.y === y - 1)
  if (indexSur === -1) {
      // no encontrado
    movilidad.sur = 0
  } else if (nivelArray[indexSur].entrable === 'entrable') {
      // encontrado y entrable
    movilidad.sur = 1
      // encontrado y no entrable
  } else {
    movilidad.sur = 2
  }
}

function cambiaNivel (direccion) {
  let partida = document.getElementById('nivel' + nivelActual)
  partida.style.visibility = 'hidden'

  let coordenadasPartida = conseguirCoordenadas(nivelActual)

  let xLlegada
  let yLlegada

  if (direccion == 'norte') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y + 1
  }

  if (direccion == 'sur') {
    xLlegada = coordenadasPartida.x
    yLlegada = coordenadasPartida.y - 1
  }

  if (direccion == 'este') {
    xLlegada = coordenadasPartida.x + 1
    yLlegada = coordenadasPartida.y
  }

  if (direccion == 'oeste') {
    xLlegada = coordenadasPartida.x - 1
    yLlegada = coordenadasPartida.y
  }

  let nombreLlegada = conseguirNombre(xLlegada, yLlegada)

  let llegada = document.getElementById('nivel' + nombreLlegada)
  llegada.style.visibility = 'visible'

  nivelActual = nombreLlegada
  botonesNavegacion(xLlegada, yLlegada)
}

function actualizarAcciones (tomar, mirar, usar) {
  if (tomar === 1) {
    document.querySelector('.tomar').src = 'interfaz/tomarp.png'
  } else {
    document.querySelector('.tomar').src = 'interfaz/tomar.png'
  }

  if (mirar === 1) {
    document.querySelector('.mirar').src = 'interfaz/mirarp.png'
  } else {
    document.querySelector('.mirar').src = 'interfaz/mirar.png'
  }

  if (usar === 1) {
    document.querySelector('.usar').src = 'interfaz/usarp.png'
  } else {
    document.querySelector('.usar').src = 'interfaz/usar.png'
  }
}

// ///////// elbotondetomar{}  //////////////////

const botontomar = document.createElement('input')
botontomar.setAttribute('type', 'image')
botontomar.setAttribute('onclick', 'tomartomar()')
botontomar.src = 'interfaz/tomar.png'
botontomar.className = 'tomar'

divPrincipal.appendChild(botontomar)

function tomartomar () {
  if (detener == 0 && usaro1 == null) {
    mirar = 0
    usar = 0
    if (tomar == 0) {
      tomar = 1
      ssel.play()
    } else if (tomar == 1) {
      tomar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}

// ////////// elbotondemirar(){} ////////////////////

const botonmirar = document.createElement('input')
botonmirar.setAttribute('type', 'image')
botonmirar.setAttribute('onclick', 'mirarmirar()')
botonmirar.src = 'interfaz/mirar.png'
botonmirar.className = 'mirar'

divPrincipal.appendChild(botonmirar)

function mirarmirar () {
  if (detener === 0 && usaro1 === null) {
    tomar = 0
    usar = 0
    if (mirar == 0) {
      mirar = 1
      ssel.play()
    } else if (mirar == 1) {
      mirar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}

// ////////// elbotondeusar(){} ////////////////////

const botonusar = document.createElement('input')
botonusar.setAttribute('type', 'image')
botonusar.setAttribute('onclick', 'usarusar()')
botonusar.src = 'interfaz/usar.png'
botonusar.className = 'usar'

divPrincipal.appendChild(botonusar)

function usarusar () {
  if (detener == 0 && usaro1 == null) {
    mirar = 0
    tomar = 0
    if (usar == 0) {
      usar = 1
      ssel.play()
    } else if (usar == 1) {
      usar = 0
      sunsel.play()
    }
    actualizarAcciones(tomar, mirar, usar)
  }
}

// /////// Declarando inventario//////////////

let inventa = []

// Generadores de objetos

function objeto (nombre, juntable, lugar) {
  const boton = `<input type="image" id="${nombre}" src="interfaz/obj/${nombre}.png" class="objeto${nombre}" onclick="accion('${nombre}', '${juntable}')" />`
  let nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', boton)
}

function objetoFondo (nombre, lugar) {
  const objeto = `<img src="interfaz/obj/${nombre}.png" class="objeto${nombre}" />`
  const nivel = document.getElementById('nivel' + lugar)
  nivel.insertAdjacentHTML('afterbegin', objeto)
}

function accion (nombre, juntable) {
  if (detener) return undefined

  if (tomar) {
    if (juntable == 'tomable') {
      let boton = document.getElementById(nombre)
      let lugar = boton.parentNode
      lugar.removeChild(boton)
      audio.play()
      let tomado = new objetoi(nombre)
    } else {
      cuadromirar('notomar')
    }
    tomar = 0
  }

  if (mirar) {
    mirar = 0
    cuadromirar(nombre)
  }

  if (usar) {
    usaro2 = nombre
    accionUsar()
  }

  actualizarAcciones(tomar, mirar, usar)
}

function accionUsar () {
  let parte1 = usaro1 || ''

  if (usaro1 != null) {
    selecFicha()
  }

  let parte2 = usaro2

  let combinacion = parte1 + parte2

  funcionesUsar(combinacion)

  usaro1 = null
  usaro2 = null

  usar = 0
}

function cuadromirar (nombre) {
  detener = 1
  sabrir.play()

  const cuadrin = `
  <div class="textines" id="m${nombre}" onclick="sacarcuadro('m${nombre}')">
    <p class="letras">${nombre}</p>
  </div>`

  divPrincipal.insertAdjacentHTML('afterbegin', cuadrin)
}

function cuadrousar (nombre) {
  detener = 1

  const cuadrin = document.createElement('div')
  cuadrin.className = 'textines'
  cuadrin.setAttribute('id', 'u' + nombre)

  const texto1 = document.createElement('p')
  texto1.textContent = 'no se que queres que haga'
  texto1.className = 'letras'

  divPrincipal.appendChild(cuadrin)
  cuadrin.appendChild(texto1)

  const sacardir = "sacarcuadro('u" + nombre + "')"
  cuadrin.setAttribute('onclick', sacardir)
}

function sacarcuadro (nombre) {
  const cuadro = document.getElementById(nombre)
  divPrincipal.removeChild(cuadro)
  scerrar.play()
  detener = 0
}

// Generadores de fichas de invetario

function objetoi (nombre) {
  objetoi.count++
  inventa[objetoi.count] = nombre
  const boton = `<input type="image" id="${nombre}" onclick="accionficha('${nombre}')" src="interfaz/obj/${nombre}-o.png" class="objeto${objetoi.count}o" />`
  divPrincipal.insertAdjacentHTML('afterbegin', boton)
}

function accionficha (nombre) {
  if (detener) return undefined

  if (usar) {
    if (usaro1 == null) {
      const index = inventa.findIndex(objInventario => objInventario === nombre)
      if (index !== -1) {
        selecFicha(nombre, index)
      }
    } else {
      usaro2 = nombre
      accionUsar()
    }
  }

  if (mirar) {
    mirar = 0
    cuadromirar(nombre)
  }
  actualizarAcciones(tomar, mirar, usar)
}

function selecFicha (nombre, indice) {
  console.log('entro en seleccion');
  if (!seleccion) {
    console.log('es 0');
    console.log(inventa);
    seleccion = 1
    const imgsele = `<input type="image" src="interfaz/fichasel.png" id="pepito" class="objeto${indice}o always-on-top" />`
    console.log(imgsele);
    divPrincipal.insertAdjacentHTML('afterbegin', imgsele)

    usaro1 = nombre
    asf.play()
  } else {
    console.log('es 1');
    seleccion = 0
    const botone = document.getElementById('pepito')
    divPrincipal.removeChild(botone)
  }
}

function eliminar (nombre) {
  const botone = document.getElementById(nombre)
  divPrincipal.removeChild(botone)

  const index = inventa.findIndex(obj => obj === nombre)
  if (index === -1) return undefined

  inventa[index] = null
  objetoi.count--
  inventario()
}

function eliminarDelNivel (nombre) {
  let hijo = document.getElementById(nombre)
  let padre = hijo.parentNode
  padre.removeChild(hijo)
}

// ordenador de inventario

function inventario () {
  let a = 1
  let test
  let test2
  let elqsigue

  for (var indice = 0; indice < inventa.length; indice++) {
    if (inventa[indice]) continue
    let siguienteIndice = indice + 1
    let siguienteElemento = inventa[indice + 1]
    if (siguienteElemento) {
      document.getElementById(siguienteElemento).className = `objeto${indice}o`
      inventa[siguienteIndice] = null
      inventa[indice] = siguienteElemento
    }
  }
}
