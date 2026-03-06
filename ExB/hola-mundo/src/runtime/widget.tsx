import './widget.css'

import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  return (
    <div className="hola-mundo">
      <h1>Hola Mundo</h1>
    </div>
  )
}

export default Widget
