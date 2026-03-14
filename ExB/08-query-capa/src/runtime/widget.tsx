import { React, type AllWidgetProps } from 'jimu-core'
import { type IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useEffect, useState } from 'react'
import Query from 'esri/rest/support/Query'
import type FeatureLayer from 'esri/layers/FeatureLayer'
import { type Point } from 'esri/geometry'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  console.log('Propiedades del Widget', props)

  const [vistaActiva, setVistaActiva] = useState<JimuMapView>()

  useEffect(() => {
    if (vistaActiva) {
      const eventoClick = vistaActiva.view.on('click', (eventoClickResultado) => {
        const geometriaClick: Point = eventoClickResultado.mapPoint
        const parametrosQuery = new Query({
          geometry: geometriaClick,
          outFields: ['*'],
          spatialRelationship: 'intersects'
        })

        const capaEspaciosNaturales: FeatureLayer = vistaActiva.view.map.allLayers.items[2]

        capaEspaciosNaturales.queryFeatures(parametrosQuery).then((resultadosQuery) => {
          console.log(resultadosQuery)
        })
      })

      return () => {
        eventoClick.remove()
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
    <div className='query-punto'>
    {
      props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <JimuMapViewComponent onActiveViewChange={activeViewHandler} useMapWidgetId={props.useMapWidgetIds[0]}></JimuMapViewComponent>
      )
    }
    </div>
  )
}

export default Widget
