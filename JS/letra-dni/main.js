const dni = window.prompt('Inserta el número tu DNI')
const letras = [
  'T',
  'R',
  'W',
  'A',
  'G',
  'M',
  'Y',
  'F',
  'P',
  'D',
  'X',
  'B',
  'N',
  'J',
  'Z',
  'S',
  'Q',
  'V',
  'H',
  'L',
  'C',
  'K',
  'E',
  'T'
]

if (dni > 0 && dni < 99999999) {
  const posicion = dni % 23
  const letra = letras[posicion]
  const dniStr = new String(dni)
  const dniLetra = dniStr + letra
  alert(dniLetra)
} else {
  alert('Inserta un número válido')
}
