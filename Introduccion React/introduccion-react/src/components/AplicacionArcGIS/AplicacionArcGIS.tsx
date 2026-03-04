import { useState } from 'react'
import './AplicacionArcGIS.css'
import TarjetaEjemplo from './TarjetaEjemplo/TarjetaEjemplo'

interface AplicacionArcGISProps {
  titulo: 'Experience Builder' | 'Story Maps'
  descripcion: string
  enlace: string
  direccionEnlace: string
}

function AplicacionArcGIS(props: AplicacionArcGISProps) {
  // Funcion de estado

  let [estadoBoton, setEstadoBoton] = useState(false)

  let ejemplosRenderizados

  if (props.titulo === 'Experience Builder' && estadoBoton) {
    ejemplosRenderizados = (
      <>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 1'}
          descripcion={'Descripcion Ejemplo 1'}
          enlace={''}
        ></TarjetaEjemplo>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 2'}
          descripcion={'Descripcion Ejemplo 2'}
          enlace={''}
        ></TarjetaEjemplo>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 3'}
          descripcion={'Descripcion Ejemplo 3'}
          enlace={''}
        ></TarjetaEjemplo>
      </>
    )
  }

  if (props.titulo === 'Story Maps' && estadoBoton) {
    ejemplosRenderizados = (
      <>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 1 Story Maps'}
          descripcion={'Descripcion Ejemplo 1'}
          enlace={''}
        ></TarjetaEjemplo>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 2 Story Maps'}
          descripcion={'Descripcion Ejemplo 2'}
          enlace={''}
        ></TarjetaEjemplo>
        <TarjetaEjemplo
          urlImagen={''}
          titulo={'Ejemplo 3 Story Maps'}
          descripcion={'Descripcion Ejemplo 3'}
          enlace={''}
        ></TarjetaEjemplo>
      </>
    )
  }

  function buttonHandler(eventoClick: any) {
    if (estadoBoton) {
      setEstadoBoton(false)
    }

    if (estadoBoton == false) {
      setEstadoBoton(true)
    }
  }

  return (
    <div className="aplicacion-arcgis">
      <div className="informacion-aplicacion">
        <img
          src="https://placehold.co/100x100"
          alt="Imagen de prueba"
        />
        <div className="texto-aplicacion">
          <h1>{props.titulo}</h1>
          <p>{props.descripcion}</p>
          <a href={props.direccionEnlace}>{props.enlace}</a>
          <button onClick={buttonHandler}>Ver Ejemplos</button>
        </div>
      </div>

      <div className="ejemplos-aplicacion">{ejemplosRenderizados}</div>
    </div>
  )
}

export default AplicacionArcGIS
