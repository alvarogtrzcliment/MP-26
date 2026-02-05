console.log('Hola desde el otro lado')

let cocheAzul = 'Coche Azul'

cocheAzul = 'Coche Verde'

console.log(cocheAzul)

const arrayCoches = ['cocheAzul', 'cocheVerde', 4]

console.log(arrayCoches[0])

// Condicionales

const numeroPeces = 17

if (numeroPeces <= 4) {
  console.log(`Tienes ${numeroPeces} que son menos de 4 peces`)
}

//  Bucles

for (let contador = 0; contador < 6; contador = contador + 1) {
  console.log(`Estoy en la iteración número ${contador}`)
}
// Bucles for of

const semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']

for (const dia of semana) {
  console.log(dia)
}

for (const posicionDia in semana) {
  console.log(posicionDia)
}
