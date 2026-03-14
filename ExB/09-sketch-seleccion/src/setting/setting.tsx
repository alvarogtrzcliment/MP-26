import { React } from 'jimu-core'
import { type AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector, SettingSection } from 'jimu-ui/advanced/setting-components'

const Setting = (props: AllWidgetSettingProps<any>) => {
  console.log('Propiedades del Setting', props)

  function selectMapHandler (eventoMapa) {
    console.log('onSelect', eventoMapa)

    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: eventoMapa
    })
  }

  return (
    <SettingSection title={'Seleccione un Mapa'}>
      <MapWidgetSelector useMapWidgetIds={ props.useMapWidgetIds } onSelect={selectMapHandler} autoSelect={false}></MapWidgetSelector>
    </SettingSection>
  )
}

export default Setting
