import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
import "./widget.css";
import { Button } from "jimu-ui";
import WMSLayer from "esri/layers/WMSLayer";
import Legend from "esri/widgets/Legend";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades Widget", props);
	const [vistaActiva, setVistaActiva] = useState<JimuMapView>();

	function activeViewChangeHandler(eventoVistaMap: JimuMapView) {
		console.log("Vista activa", eventoVistaMap);
		setVistaActiva(() => eventoVistaMap);
	}

	async function buttonHandler() {
		const servicio = new WMSLayer({
			url: props.config.urlWMS,
		});
		console.log("servicio", servicio);

		await servicio.load().then((results) => {
			// const subCapa = results.findSublayerById(0);

			if (vistaActiva) {
				vistaActiva.view.map.add(servicio);
				console.log(results);

				const leyenda = new Legend({
					view: vistaActiva.view,
				});

				vistaActiva.view.ui.add(leyenda, { position: "bottom-right" });
			}
		});
	}

	return (
		<div className="plantilla-mapa">
			<Button onClick={buttonHandler}>WMS</Button>

			{props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
				<JimuMapViewComponent
					useMapWidgetId={props.useMapWidgetIds[0]}
					onActiveViewChange={activeViewChangeHandler}
				/>
			)}
		</div>
	);
};

export default Widget;
