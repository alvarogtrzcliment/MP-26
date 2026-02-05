const numero1 = 7000
const numero2 = 23

const distanciaACienNumero1 = Math.abs(100 - numero1)
const distanciaACienNumero2 = Math.abs(100 - numero2)

if (distanciaACienNumero1 > distanciaACienNumero2) {
  console.log(`${numero2} está mas cerca de 100`)
} else {
  console.log(`${numero1} está mas cerca de 100`)
}

if (Math.abs(100 - numero1) > Math.abs(100 - numero2)) {
  console.log(`${numero2} está mas cerca de 100`)
} else {
  console.log(`${numero1} está mas cerca de 100`)
}
