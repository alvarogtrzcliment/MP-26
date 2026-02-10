const boton = document.getElementById('boton')

function botonHandler(eventoClick) {
  console.log(eventoClick)
}

boton.addEventListener('click', botonHandler)

const inputTexto = document.getElementById('input-texto')

function inputTextoHandler(eventoChange) {
  const textoUsuario = eventoChange.target.value
  const parrafoNuevo = document.createElement('p')
  parrafoNuevo.innerHTML = textoUsuario
  document.body.appendChild(parrafoNuevo)
}

inputTexto.addEventListener('change', inputTextoHandler)
