import { React } from "jimu-core";
import { AllWidgetSettingProps } from "jimu-for-builder";

//Configurar el panel de configuración del widget
const Setting = (props: AllWidgetSettingProps<any>) => {
	console.log("Propiedades del Setting", props);

	function nombreHandler(eventoNombre) {
		console.log("evento nombre", eventoNombre);
		props.onSettingChange({
			id: props.id,
			config: props.config.set("nombre", eventoNombre.target.value),
		});
	}

	function fotoHandler(eventoFoto) {
		console.log("evento foto", eventoFoto);
		props.onSettingChange({
			id: props.id,
			config: props.config.set("foto", eventoFoto.target.value),
		});
	}

	return (
		<>
			<div>
				<label htmlFor="">Nombre:</label>
				<input onChange={nombreHandler} type="text" />
				<label htmlFor="">Foto:</label>
				<input onChange={fotoHandler} type="url" />
			</div>
		</>
	);
};

export default Setting;
