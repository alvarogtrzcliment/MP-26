import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";
import {
	SettingSection,
	MapWidgetSelector,
} from "jimu-ui/advanced/setting-components";

//Configurar el panel de configuración del widget
const Setting = (props: AllWidgetSettingProps<any>) => {
	console.log("Propiedades Settings", props);

	function mapHandler(eventoMapa: string[]) {
		props.onSettingChange({
			id: props.id,
			useMapWidgetIds: eventoMapa,
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
		</>
	);
};

export default Setting;
