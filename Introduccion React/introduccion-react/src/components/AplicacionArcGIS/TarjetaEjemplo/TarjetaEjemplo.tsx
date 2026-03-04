import './TarjetaEjemplo.css'

interface TarjetaEjemploProps {
  urlImagen: string
  titulo: string
  descripcion: string
  enlace: string
}

function TarjetaEjemplo(props: TarjetaEjemploProps) {
  return (
    <div className="tarjeta-ejemplo">
      <img
        src={props.urlImagen}
        alt="Imagen Ejemplo"
      />
      <h2>{props.titulo}</h2>
      <p>{props.descripcion}</p>
      <a href={props.enlace}>Enlace al ejemplo</a>
    </div>
  )
}

export default TarjetaEjemplo
