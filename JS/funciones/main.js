// FUNCIONES

function holaMundo() {
  console.log('Hola mundo')
  return 'Hola Mundo'
}

const salidaFuncion = holaMundo()

console.log(salidaFuncion)

// Funcion sumar 2 números

function sumarNumeros(numero1, numero2) {
  const suma = numero1 + numero2
  return suma
}

const resultado23 = sumarNumeros(2, 3)

console.log(resultado23)

//  Método .map

const arrayNumeros = [3, 4, 5, 6, 7, 8, 9]

const resultadoOperacion = arrayNumeros.map(function (numero, posicion) {
  const multiplicacion = numero * 2
  console.log(posicion)
  return multiplicacion
})

console.log(resultadoOperacion)

//  Funciones de tipo flecha

function sumaUno(parametro) {
  return parametro + 1
}

const sumaDos = (numero) => {
  return numero + 2
}

const suma3 = sumaDos(3)

const resultadoFlecha = arrayNumeros.map(() => {})

// Funcion que me concatena 2 strings sin la primera letra

function concatenacionStrings(string1, string2) {
  const string1sinLetra = string1.slice(1)
  const string2sinLetra = string2.substring(1)

  const unionStrings = string1sinLetra.concat(string2sinLetra)

  return unionStrings
}

console.log(concatenacionStrings('Hola', 'Mundo'))

// Funcion de palabra inversa

function palabraInversa(palabra) {
  const dividirPalabra = palabra.split('')
  const invertirPalabra = dividirPalabra.reverse()
  const unionPalabra = invertirPalabra.join('')

  return unionPalabra
}

console.log(palabraInversa('Hola'))

//  Funcion que cuenta las vocales

function cuentaVocales(palabra) {
  const palabraMinuscula = palabra.toLowerCase()
  const arrayLetras = palabraMinuscula.split('')

  // const palabraMayuscula = palabra.toUpperCase()

  //  Opción 1

  // for (const letra of palabraMayuscula) {
  //   console.log(letra)
  // }

  // Opción 2

  let contador = 0

  arrayLetras.map((letra) => {
    if (
      letra === 'a' ||
      letra === 'e' ||
      letra === 'i' ||
      letra === 'o' ||
      letra === 'u'
    ) {
      contador++
    }
  })

  return contador
}

console.log(cuentaVocales('Hola Mundo'))
