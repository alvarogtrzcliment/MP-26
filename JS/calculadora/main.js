// Sellecionar los botones

const botonCalcular = document.getElementById('boton-calcular')
const botonReiniciar = document.getElementById('boton-reiniciar')
const inputTexto = document.getElementById('input-texto')
const parrafoNuevo = document.getElementById('parrafo-nuevo')

// Funcionalidad Botón Calcular

function botonCalcularHandler(eventoClick) {
  // Paso 1: Recoger la información del input:

  console.log(inputTexto.value)
  const textoNumeros = inputTexto.value

  // Paso 2: Transformar a Array de numeros

  const arrayTexto = textoNumeros.split(',')
  console.log(arrayTexto)
  const arrayNumeros = arrayTexto.map(function (numeroTexto) {
    return Number(numeroTexto)
  })
  console.log(arrayNumeros)

  // Paso 3 Operaciones

  // Suma

  let suma = 0

  arrayNumeros.map(function (numero) {
    suma = suma + numero
  })

  // media

  const media = suma / arrayNumeros.length

  console.log(media)

  // Añadir la información a mi página web

  parrafoNuevo.innerHTML = `La suma de los números es: ${suma}, y la media es: ${media}`
}

botonCalcular.addEventListener('click', botonCalcularHandler)

function botonReiniciarHandler(eventoClick) {
  inputTexto.value = ''
  parrafoNuevo.innerHTML = ''
}

botonReiniciar.addEventListener('click', botonReiniciarHandler)
