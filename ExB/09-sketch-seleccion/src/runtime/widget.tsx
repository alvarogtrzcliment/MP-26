import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useEffect, useState } from 'react'
import { Alert } from 'jimu-ui'
import Sketch from "@arcgis/core/widgets/Sketch"
import GraphicsLayer from 'esri/layers/GraphicsLayer'
import Query from 'esri/rest/support/Query'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  console.log('Propiedades del Widget', props)

  const [vistaActiva, setVistaActiva] = useState<JimuMapView>()

  useEffect(() => {
    if (vistaActiva) {
      const capaGrafica = new GraphicsLayer()

      const sketchWidget = new Sketch({
        view: vistaActiva.view,
        layer: capaGrafica
      })

      sketchWidget.on('create', (eventoSketch) => {
        if (eventoSketch.tool === 'polygon' && eventoSketch.state === 'complete') {
          const graficoPoligono = eventoSketch.graphic

          const parametrosQuery = new Query({
            geometry: graficoPoligono.geometry,
            spatialRelationship: 'intersects',
            outFields: ['*']
          })

          vistaActiva.view.popupEnabled = true

          vistaActiva.view.map.allLayers.items[2].queryFeatures(parametrosQuery).then((resultados) => {
            console.log(resultados.features)
          })
        }
      })

      vistaActiva.view.map.add(capaGrafica)

      vistaActiva.view.ui.add(sketchWidget, {
        position: 'top-right'
      })

      return () => {
        vistaActiva.view.map.remove(capaGrafica)
        vistaActiva.view.ui.remove(sketchWidget)
      }
    }
  }, [vistaActiva])

  function activeViewHandler (eventoMapView: JimuMapView) {
    console.log('JimuMapView: ', eventoMapView)
    if (eventoMapView) {
      setVistaActiva(() => eventoMapView)
    }
  }

  return (
    <div className='primer-mapa'>
    {
      vistaActiva ? <></> : <Alert>Selecciona el Mapa</Alert>
    }
    {
      props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent onActiveViewChange={activeViewHandler} useMapWidgetId={props.useMapWidgetIds[0]}></JimuMapViewComponent>
      )
    }

    </div>
  )
}

export default Widget
