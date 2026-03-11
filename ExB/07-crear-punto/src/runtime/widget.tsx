import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useState } from "react";
import "./widget.css";
import { Button, NumericInput } from "jimu-ui";
import { Point } from "esri/geometry";
import Graphic from "esri/Graphic";
import Color from "esri/Color";
import { SimpleLineSymbol } from "esri/symbols";
import { SimpleMarkerSymbol } from "esri/symbols";
import GraphicsLayer from "esri/layers/GraphicsLayer";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades Widget", props);

	const [vistaActiva, setVistaActiva] = useState<JimuMapView>();
	const [coordenadas, setCoordenadas] = useState({ latitud: 0, longitud: 0 });

	const simpleMarkerSymbol = new SimpleMarkerSymbol({
		angle: 0,
		color: new Color([67, 173, 234, 1]),
		outline: new SimpleLineSymbol({
			cap: "round",
			color: new Color([0, 122, 194, 1]),
			join: "round",
			miterLimit: 1,
			style: "solid",
			width: 1,
		}),
		path: "undefined",
		size: 12,
		style: "circle",
		xoffset: 0,
		yoffset: 0,
	});

	function activeViewChangeHandler(eventoVistaMap: JimuMapView) {
		console.log("JimuMapView", eventoVistaMap);
		setVistaActiva(() => eventoVistaMap);
	}

	function longitudHandler(eventoChange: number) {
		console.log("evento long", eventoChange);
		setCoordenadas((coordenadasDefault) => {
			return {
				latitud: coordenadasDefault.latitud,
				longitud: eventoChange,
			};
		});
	}

	function latitudHandler(eventoChange: number) {
		console.log("evento lat", eventoChange);
		setCoordenadas((coordenadasDefault) => {
			return {
				latitud: eventoChange,
				longitud: coordenadasDefault.longitud,
			};
		});
	}

	console.log("coordenadas", coordenadas);

	function buttonHandler() {
		const geometria = new Point({
			longitude: coordenadas.longitud,
			latitude: coordenadas.latitud,
		});
		const graficoPto = new Graphic({
			geometry: geometria,
			symbol: simpleMarkerSymbol,
		});

		const capaGrafico = new GraphicsLayer();
		capaGrafico.add(graficoPto);

		vistaActiva.view.map.add(capaGrafico);
	}

	return (
		<div className="plantilla-mapa">
			<label>
				Longitud:{" "}
				<NumericInput
					defaultValue={0}
					precision={2}
					title="longitud"
					onChange={longitudHandler}
				/>
			</label>
			<label>
				Latitud:{" "}
				<NumericInput
					defaultValue={0}
					precision={2}
					title="latitud"
					onChange={latitudHandler}
				/>
			</label>
			<Button onClick={buttonHandler}>Crear punto</Button>
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
