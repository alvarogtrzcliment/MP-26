import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { type JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
import "./widget.css";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	const [informacionMapa, setInformacionMap] = useState({
		titulo: "",
		descripcion: "",
		tags: "",
		owner: "",
	});

	function activeViewChangeHandler(eventoMap: JimuMapView) {
		console.log("JimuMapView", eventoMap);

		if (eventoMap) {
			setInformacionMap((estado) => {
				return {
					titulo: eventoMap.view.map.portalItem.title,
					descripcion: eventoMap.view.map.portalItem.description,
					tags: eventoMap.view.map.portalItem.tags,
					owner: eventoMap.view.map.portalItem.owner,
				};
			});
		}
	}

	return (
		<div className="plantilla-mapa">
			<h2>Título: {informacionMapa.titulo}</h2>
			<li>
				<strong>Descripción: </strong>
				{informacionMapa.descripcion}
			</li>
			<li>
				<strong>Tags: </strong>
				{informacionMapa.tags}
			</li>
			<li>
				<strong>Propietario: </strong>
				{informacionMapa.owner}
			</li>
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
