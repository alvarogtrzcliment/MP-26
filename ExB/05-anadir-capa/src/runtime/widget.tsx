import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import { JimuMapView, JimuMapViewComponent } from "jimu-arcgis";
import { useEffect, useState } from "react";
import "./widget.css";
import { Button, UrlInput, UrlInputResult } from "jimu-ui";
import FeatureLayer from "esri/layers/FeatureLayer";
import WMSLayer from "esri/layers/WMSLayer";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	const [vistaActiva, setVistaActiva] = useState<JimuMapView>();
	const [capaUrl, setUrlCapa] = useState<string>("");
	const [capa, setCapa] = useState<FeatureLayer>();
	const [wms, setWMS] = useState<WMSLayer>();

	useEffect(() => {
		if (vistaActiva && capaUrl) {
			vistaActiva.view.map.add(capa);
			vistaActiva.view.map.add(wms);
			return () => {
				vistaActiva.view.map.remove(capa);
				vistaActiva.view.map.remove(wms);
			};
		}
	}, [vistaActiva, capa, wms]);

	function activeViewChangeHandler(eventoVistaMapa: JimuMapView) {
		console.log("JimuMapView", eventoVistaMapa);

		if (eventoVistaMapa) {
			setVistaActiva(() => eventoVistaMapa);
		}
	}

	function urlInputHandler(urlInputEvento: UrlInputResult) {
		console.log("url", urlInputEvento);
		setUrlCapa(() => urlInputEvento.value);
	}

	function urlWMSHandler(urlWMSEvento: UrlInputResult) {
		console.log("wms", urlWMSEvento);
		setUrlCapa(() => urlWMSEvento.value);
	}

	function buttonHandler() {
		const capaFL = new FeatureLayer({
			url: capaUrl,
		});
		setCapa(() => capaFL);
		const wmsLY = new WMSLayer({
			url: capaUrl,
		});
		setWMS(() => wmsLY);
	}

	return (
		<div className="plantilla-mapa">
			<div>
				<label htmlFor="">
					<strong>Añade la Feuature Layer</strong>
				</label>
				<UrlInput
					schemes={["https"]}
					onAcceptValue={urlInputHandler}
				></UrlInput>
			</div>
			<div>
				<label htmlFor="">
					<strong>Añade WMS</strong>
				</label>
				<UrlInput schemes={["https"]} onAcceptValue={urlWMSHandler}></UrlInput>
			</div>
			<Button onClick={buttonHandler}>Añadir capa al mapa</Button>
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
