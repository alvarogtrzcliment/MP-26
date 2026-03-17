import './widget.css'
import { React, type AllWidgetProps } from 'jimu-core'
import type { IMConfig } from '../config'
import { type JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { useState } from 'react'
import { Alert, NumericInput, Option, Select } from 'jimu-ui'
import FeatureLayer from 'esri/layers/FeatureLayer'

interface propiedadesRenderizador {
  forma: 'circle' | 'diamond' | 'square'
  tamano: number
  color: string
}

const Widget = (props: AllWidgetProps<IMConfig>) => {
  // AQUI USO ESTO CUANDO TENGO QUE HACER ALGO CON EVENTOS EXTERNOS COMO BOTONES, INPUTS, SELECTORES
  const [vistaActiva, setVistaActiva] = useState<JimuMapView>()
  const [valoresRenderizador, setValoresRenderizador] =
    useState<propiedadesRenderizador>({
      forma: 'circle',
      tamano: 10,
      color: '007ac2'
    })

  function activeViewChangeHandler(jmv: JimuMapView) {
    // AQUI PASAN COSAS CUANDO ARRASTRO DESDE EL MENU

    console.log(jmv)

    setVistaActiva(() => jmv)
  }

  function seleccionFormaHandler(eventoForma) {
    setValoresRenderizador((estadoAnterior) => ({
      tamano: estadoAnterior.tamano,
      forma: eventoForma.target.value,
      color: estadoAnterior.color
    }))
  }

  function seleccionTamanoHandler(eventoTamano) {
    setValoresRenderizador((estadoAnterior) => ({
      tamano: eventoTamano,
      forma: estadoAnterior.forma,
      color: estadoAnterior.color
    }))
  }

  function colorPickerHandler(eventoColor) {
    setValoresRenderizador((estadoAnterior) => ({
      tamano: estadoAnterior.tamano,
      forma: estadoAnterior.forma,
      color: eventoColor.target.value
    }))
  }

  function anadirCapaHandler() {
    if (props.config.urlCapa.length > 1) {
      const capaHospitalesFL = new FeatureLayer({
        url: props.config.urlCapa,
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-marker',
            color: valoresRenderizador.color,
            style: valoresRenderizador.forma,
            size: valoresRenderizador.tamano
          }
        }
      })

      vistaActiva.view.map.add(capaHospitalesFL)
    }
  }

  return (
    <div className="examen-dos">
      {!props.useMapWidgetIds && (
        <Alert
          title="Alerta"
          text="Selecciona el mapa"
          type="warning"
          withIcon
        ></Alert>
      )}
      {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
        <>
          <div className="panel-renderizado">
            <h3>Define el renderizado</h3>
            <h4>Ajustes de símbolo</h4>
            <p>Forma del símbolo</p>
            <Select
              placeholder="Selecciona la forma del Símbolo"
              onChange={seleccionFormaHandler}
            >
              <Option value={'circle'}>Circulares</Option>
              <Option value={'diamond'}>Rombos</Option>
              <Option value={'square'}>Cuadrados</Option>
            </Select>
            <p>Tamaño del símbolo</p>
            <NumericInput
              defaultValue={10}
              onAcceptValue={seleccionTamanoHandler}
              title="Selecciona el tamaño"
              placeholder="Selecciona el tamaño"
            />
            <calcite-color-picker
              oncalciteColorPickerChange={colorPickerHandler}
            ></calcite-color-picker>
            <calcite-button onClick={anadirCapaHandler}>
              Añadir Capa
            </calcite-button>
          </div>
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
