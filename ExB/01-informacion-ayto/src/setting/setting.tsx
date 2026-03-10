import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";

//Configurar el panel de configuración del widget
const Setting = (props: AllWidgetSettingProps<any>) => {
	console.log("Propiedades del Setting", props);
	return (
		<div>
			<h1>Hola Mundo</h1>
		</div>
	);
};

export default Setting;
