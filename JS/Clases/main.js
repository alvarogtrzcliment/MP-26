// Crear una clase

class Bicicleta {
  // Propiedades

  constructor(numeroRuedas, color, tipo, marchas) {
    this.numeroRuedas = numeroRuedas
    this.color = color
    this.tipo = tipo
    this.marchas = marchas
  }

  // Métodos

  pintarBicicleta(colorNuevo) {
    this.color = colorNuevo
  }
}

const bicicletaRoja = new Bicicleta(2, 'Rojo', 'BMX', 1)

console.log(bicicletaRoja)

bicicletaRoja.pintarBicicleta('Amarillo')

console.log(bicicletaRoja)
