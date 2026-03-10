import "./widget.css";
import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { type JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	function activeViewChangeHandler(eventoVistaMapa: JimuMapView) {
		console.log(eventoVistaMapa);
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
