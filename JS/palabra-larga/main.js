const palabras = [
  'pájaro',
  'galleta',
  'coche',
  'apalancamiento',
  'manzana',
  'bicicleta'
]

let palabraMasLarga

for (const palabra of palabras) {
  if (palabraMasLarga) {
    if (palabraMasLarga.length < palabra.length) {
      palabraMasLarga = palabra
    }
  } else {
    palabraMasLarga = palabra
  }

  console.log(palabraMasLarga)
}
