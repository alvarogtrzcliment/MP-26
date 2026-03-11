import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
import "./widget.css";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades Widget", props);

	const [vistaActiva, setVistaActiva] = useState<JimuMapView>();

	function activeViewChangeHandler(eventoVistaMap: JimuMapView) {
		console.log("JimuMapView", eventoVistaMap);
		setVistaActiva(() => eventoVistaMap);
	}

	return (
		<div className="plantilla-mapa">
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
