// Seleccionar elementos en mi documento HTML

const subtitulo = document.getElementById('subtitulo')
console.log(subtitulo)

// function subtituloVisible (){
//   subtitulo.hidden = !subtitulo.hidden
// }

// Cuando tenemos ALL nos devuelve un NODE-ARRAY!!!!!

const parrafos = document.querySelectorAll('p')
console.log(parrafos)

const parrafosPares = document.querySelectorAll('.parrafo-par')
console.log(parrafosPares)

parrafosPares.forEach((parrafo) => {
  parrafo.hidden = true
})

// Crear elementos

const parrafoNuevo = document.createElement('p')
const nodoTexto = document.createTextNode(
  'Este párrafo está creado dinámicamente a través de JavaScript'
)

const divVacio = document.createElement('div')
divVacio.id = 'div-vacio'

parrafoNuevo.appendChild(nodoTexto)

divVacio.appendChild(parrafoNuevo)

document.body.appendChild(divVacio)
