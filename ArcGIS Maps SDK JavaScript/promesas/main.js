// const promesa = new Promise()

// Todo sale bien con la promesa

// promesa.then((respuesta)=>{

// })

// Todo sale mal, error

// promesa.catch((error)=>{

// })

const llamadaChuckNorris = fetch('https://api.chucknorris.io/jokes/random')

llamadaChuckNorris.then((respuesta) => {
  console.log(respuesta.json())
})

llamadaChuckNorris.catch((error) => {
  console.log(error)
})

async function llamarAChuckNorris() {}
