import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { type JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
import Point from "@arcgis/core/geometry/Point";
import "./widget.css";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades del Widget", props);

	function activeViewChangeHandler(eventoMapa: JimuMapView) {
		console.log("Evento Mapa", eventoMapa);

		if (eventoMapa) {
			eventoMapa.view.on("pointer-move", (evento) => {
				console.log("pointer-move", evento);
				const punto: Point = eventoMapa.view.toMap({
					x: evento.x,
					y: evento.y,
				});
				console.log("Punto", punto);
			});
		}
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
