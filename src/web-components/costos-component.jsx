import React, { useState } from "react";
import { GestorOperaciones } from "../gestor-operaciones";
import Home from "./home-component";
window.globalCostos = {
  prenda: "",
  cantidad: 0,
  tiempo: 0,
  empleados: 0,
  TelaUsada: 0,
  BotonUsado: 0,
  CierreUsado: 0,
  HiloUsado: 0,
  costMano:0,
  costMateria:0,
  totalLote:0

};
export const CostosComponent = () => {
  // ---------boton back------------
  const [back, setBack] = useState(false);

  const btnBack = () => {
    setBack(true);
  };

  //  -----------------------------
  const [gOperaciones, setgOperaciones] = useState(false);
  const updateGlobalCostos = (key, value) => {
    window.globalCostos[key] = value;
  };

  const calCostos = () => {
    const cantidadInput = document.getElementById("cantidad").value;
    const tiempoInput = document.getElementById("tiempo").value;
    updateGlobalCostos("cantidad", parseInt(cantidadInput, 10));
    updateGlobalCostos("tiempo", parseInt(tiempoInput, 10));
    setgOperaciones(true);
  };
  if (back) {
    return <Home />;
  }
  if (gOperaciones) {
    return <GestorOperaciones />;
  }

  return (
    <>
      <div className="container-home">
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <h1>Calcular Costos</h1>
        <div className="option-home">
          <div className="options-mPrima options" tabIndex="0" onClick={() => (window.globalCostos.prenda = "Pantalon")}>
            <img src="public/imgs/pantalones.png" alt="" />
            <p>Pantalon</p>
          </div>
          <div className="options-mObra options" tabIndex="0" onClick={() => (window.globalCostos.prenda = "Camisa")}>
            <img src="public/imgs/camisa.png" alt="" />
            <p>Camisa</p>
          </div>
          <div className="options-cIndirectos options" tabIndex="0" onClick={() => (window.globalCostos.prenda = "Falda")}>
            <img src="public/imgs/falda.png" alt="" />
            <p>Falda</p>
          </div>
          <div className="options-cInformes options" tabIndex="0" onClick={() => (window.globalCostos.prenda = "Vestido")}>
            <img src="public/imgs/vestido.png" alt="" />
            <p>Vestido</p>
          </div>
        </div>

        <div className="container-formCost">
          <div className="formC">
            <div className="optionsFormC">
              <span className="spanCost">Cantidad</span>
              <input className="inputCost" type="number" id="cantidad" name="cantidad" placeholder="0" required />
            </div>
            <div className="optionsFormC">
              <span className="spanCost">Tiempo</span>
              <input className="inputCost" type="number" id="tiempo" name="tiempo" placeholder="horas" required />
            </div>
            <button className="calCost" onClick={calCostos}>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
