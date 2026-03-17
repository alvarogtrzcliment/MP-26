import './widget.css'
import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useEffect, useState } from 'react'
import { SimpleMarkerSymbol } from 'esri/symbols'
import Graphic from 'esri/Graphic'
import GraphicsLayer from 'esri/layers/GraphicsLayer'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  console.log('RENDERIZADO')

  // AQUI USO ESTO CUANDO TENGO QUE HACER ALGO CON EVENTOS EXTERNOS COMO BOTONES, INPUTS, SELECTORES
  const [vistaActiva, setVistaActiva] = useState<JimuMapView>()

  useEffect(() => {
    if (vistaActiva) {
      const capaGrafica = new GraphicsLayer()
      vistaActiva.view.map.add(capaGrafica)

      const eventoClick = vistaActiva.view.on('click', (puntoClicado) => {
        capaGrafica.removeAll()
        const geometriaPuntoClick = puntoClicado.mapPoint
        const simbologiaPunto = new SimpleMarkerSymbol({
          color: 'red'
        })
        const graficoPunto = new Graphic({
          symbol: simbologiaPunto,
          geometry: geometriaPuntoClick
        })
        capaGrafica.add(graficoPunto)
      })

      return () => {
        eventoClick.remove()
        vistaActiva.view.map.remove(capaGrafica)
      }
    }
  }, [vistaActiva])

  function activeViewChangeHandler(jmv: JimuMapView) {
    // AQUI PASAN COSAS CUANDO ARRASTRO DESDE EL MENU

    console.log(jmv)

    setVistaActiva(() => jmv)
  }

  return (
    <div className="plantilla-mapa">
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent
          useMapWidgetId={props.useMapWidgetIds[0]}
          onActiveViewChange={activeViewChangeHandler}
        />
      )}
    </div>
  )
}

export default Widget
