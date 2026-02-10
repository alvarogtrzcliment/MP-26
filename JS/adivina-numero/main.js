const numeroSecreto = 67

// Selecciono los elementos

const inputNumber = document.getElementById('input-number')
const botonAdivinar = document.getElementById('boton-adivinar')

// Creo los eventos

function botonAdivinarHandler(eventoClick) {
  const numeroUsuario = inputNumber.value

  if (numeroUsuario < numeroSecreto) {
    console.log('Número demasiado Bajo')
  }

  if (numeroUsuario > numeroSecreto) {
    console.log('Número demasiado Alto')
  }

  if (numeroSecreto == numeroUsuario) {
    console.log('Has acertado el numero 🥳')
  }
}

botonAdivinar.addEventListener('click', botonAdivinarHandler)
