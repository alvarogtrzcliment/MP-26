import './widget.css'
import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import FeatureLayer from 'esri/layers/FeatureLayer'
import { Alert } from 'jimu-ui'

const Widget = (props: AllWidgetProps<IMConfig>) => {
  function activeViewChangeHandler(jmv: JimuMapView) {
    // AQUI PASAN COSAS CUANDO ARRASTRO DESDE EL MENU

    if (jmv) {
      const capaHospitalesFL = new FeatureLayer({
        url: 'https://services1.arcgis.com/nCKYwcSONQTkPA4K/arcgis/rest/services/Hospitales/FeatureServer',
        definitionExpression: "CODAUTO = '08'",
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            color: 'green'
          }
        }
      })

      jmv.view.map.add(capaHospitalesFL)
    }
  }

  return (
    <div className="plantilla-mapa">
      {!props.useMapWidgetIds && (
        <Alert
          aria-live="polite"
          closable
          form="basic"
          open
          shape="none"
          style={{
            width: 390
          }}
          text="Selecciona el Mapa"
          title="OJO CUIDADO!"
          type="warning"
          variant="contained"
          withIcon
        />
      )}
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <>
          <Alert
            aria-live="polite"
            form="basic"
            open
            shape="none"
            style={{
              width: 450
            }}
            text="La capa se ha añadido al mapa"
            type="success"
            variant="contained"
            withIcon
          />
          <JimuMapViewComponent
            useMapWidgetId={props.useMapWidgetIds[0]}
            onActiveViewChange={activeViewChangeHandler}
          />
        </>
      )}
    </div>
  )
}

export default Widget
