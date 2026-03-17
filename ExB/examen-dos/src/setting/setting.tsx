import type { AllWidgetSettingProps } from 'jimu-for-builder'
import {
  SettingSection,
  MapWidgetSelector
} from 'jimu-ui/advanced/setting-components'

import { React } from 'jimu-core'
import { UrlInput, type UrlInputResult } from 'jimu-ui'

const Setting = (props: AllWidgetSettingProps<any>) => {
  console.log(props)
  function mapHandler(eventoMapa: string[]) {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: eventoMapa
    })
  }

  function urlInputHandler(resultado: UrlInputResult) {
    if (resultado.valid) {
      props.onSettingChange({
        id: props.id,
        config: props.config.set('urlCapa', resultado.value)
      })
    }
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
      <SettingSection title="Introduce la URL">
        <UrlInput
          schemes={['https']}
          onAcceptValue={urlInputHandler}
        ></UrlInput>
      </SettingSection>
    </>
  )
}

export default Setting
