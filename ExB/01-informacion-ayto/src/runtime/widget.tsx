import { React, type AllWidgetProps } from "jimu-core";
import type { IMConfig } from "../config";
import "./widget.css";

const Widget = (props: AllWidgetProps<IMConfig>) => {
	console.log("Propiedades del Widget", props);

	const datos = {
		nombre: "Javier Juez",
		foto: "https://placehold.co/100",
		tlf: 646157814,
		email: "javier.juez@esri.es",
	};

	return (
		<div className="tarjeta">
			<div className="principal">
				<img src={datos.foto} alt="foto" />
				<h3>{datos.nombre}</h3>
			</div>
			<div className="datos">
				<p>
					<strong>Teléfono: </strong>
					{646157814}
				</p>
				<p>
					<strong>Email: </strong>
					{datos.email}
					<a href={`mailto:${datos.email}`}>javier.juez@esri.es</a>
				</p>
			</div>
		</div>
	);
};

export default Widget;
