import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
	SettingSection,
	MapWidgetSelector,
} from "jimu-ui/advanced/setting-components";
import { UrlInput, UrlInputResult } from "jimu-ui";

//Configurar el panel de configuración del widget
const Setting = (props: AllWidgetSettingProps<any>) => {
	console.log("Propiedades Setting", props);

	function mapHandler(eventoMapa: string[]) {
		props.onSettingChange({
			id: props.id,
			useMapWidgetIds: eventoMapa,
		});
	}

	function urlInputHandler(eventoWMS: UrlInputResult) {
		console.log("url", eventoWMS);
		props.onSettingChange({
			id: props.id,
			config: props.config.set("urlWMS", eventoWMS.value),
		});
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
			<SettingSection title="Añadir WMS">
				<label>
					Only https:{" "}
					<UrlInput schemes={["https"]} onAcceptValue={urlInputHandler} />
				</label>
			</SettingSection>
		</>
	);
};

export default Setting;
