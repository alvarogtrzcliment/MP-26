import type { AllWidgetSettingProps } from 'jimu-for-builder'
import {
  SettingSection,
  MapWidgetSelector
} from 'jimu-ui/advanced/setting-components'

import { React } from 'jimu-core'

const Setting = (props: AllWidgetSettingProps<any>) => {
  console.log(props)
  function mapHandler(eventoMapa: string[]) {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: eventoMapa
    })
  }

  return (
    <>
      <SettingSection title="Selecciona el mapa">
        <MapWidgetSelector
          onSelect={mapHandler}
          useMapWidgetIds={props.useMapWidgetIds}
          autoSelect={false}
        ></MapWidgetSelector>
      </SettingSection>
    </>
  )
}

export default Setting
