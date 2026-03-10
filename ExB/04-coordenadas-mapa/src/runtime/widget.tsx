import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useEffect, useState } from "react";
import Point from "@arcgis/core/geometry/Point";
import "./widget.css";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades del Widget", props);

	const [coordenadas, setCoordenadas] = useState<Point>();
	const [vistaMapa, setVistaMapa] = useState<JimuMapView>();

	useEffect(() => {
		if (vistaMapa) {
			const pointer = vistaMapa.view.on("pointer-move", (eventoPointer) => {
				console.log("pointer", eventoPointer);
				const punto: Point = vistaMapa.view.toMap({
					x: eventoPointer.x,
					y: eventoPointer.y,
				});
				console.log("punto", punto);
				setCoordenadas(() => punto);
			});
			return () => {
				pointer.remove();
			};
		}
	}, [vistaMapa]);

	function activeViewChangeHandler(eventoVistaMapa: JimuMapView) {
		console.log("JimuMapView", eventoVistaMapa);
		if (eventoVistaMapa) {
			setVistaMapa(() => eventoVistaMapa);
		}
	}

	return (
		<div className="plantilla-mapa">
			{coordenadas && (
				<>
					<p>
						<strong>Coordenadas del mapa</strong>
					</p>
					<p>
						<strong>Latitud: </strong>
						{coordenadas.latitude}
					</p>
					<p>
						<strong>Longitud: </strong>
						{coordenadas.longitude}
					</p>
				</>
			)}

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
