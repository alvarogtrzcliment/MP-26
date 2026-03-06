import './widget.css'

import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'
import { useState } from 'react'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  const [estadoBoton, setEstadoBoton] = useState<
    'Policia' | 'Bomberos' | 'Centro Salud'
  >('Policia')

  function policiaHandler() {
    setEstadoBoton('Policia')
  }

  function bomberosHandler() {
    setEstadoBoton('Bomberos')
  }

  function centroSaludHandler() {
    setEstadoBoton('Centro Salud')
  }

  let informacionRenderizada

  if (estadoBoton === 'Policia') {
    informacionRenderizada = (
      <>
        <p>
          <strong>Dirección:</strong> Calle Falsa 111
        </p>
      </>
    )
  }

  if (estadoBoton === 'Bomberos') {
    informacionRenderizada = (
      <>
        <p>
          <strong>Dirección:</strong> Calle Falsa 222
        </p>
      </>
    )
  }

  if (estadoBoton === 'Centro Salud') {
    informacionRenderizada = (
      <>
        <p>
          <strong>Dirección:</strong> Calle Falsa 333
        </p>
      </>
    )
  }

  return (
    <div className="informacion-servicios">
      <div className="botones">
        <button onClick={policiaHandler}>Policia</button>
        <button onClick={bomberosHandler}>Bomberos</button>
        <button onClick={centroSaludHandler}>Centro de Salud</button>
      </div>
      <div className="informacion">{informacionRenderizada}</div>
    </div>
  )
}

export default Widget
