import './AplicacionArcGIS.css'

interface AplicacionArcGISProps {
  titulo: string
  descripcion: string
  enlace: string
  direccionEnlace: string
}

function AplicacionArcGIS(props: AplicacionArcGISProps) {
  return (
    <div className="aplicacion-arcgis">
      <img
        src="https://placehold.co/100x100"
        alt="Imagen de prueba"
      />
      <div className="texto-aplicacion">
        <h1>{props.titulo}</h1>
        <p>{props.descripcion}</p>
        <a href={props.direccionEnlace}>{props.enlace}</a>
      </div>
    </div>
  )
}

export default AplicacionArcGIS
