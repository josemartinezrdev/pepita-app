import React, { useState } from "react";
import { GestorOperaciones } from "../gestor-operaciones";
import { Home } from "./home-component";

export const CostosComponent = () => {
  // Estado para controlar la visualización de la página de inicio
  const [showHome, setShowHome] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  }

  // Función para mostrar la página de inicio
  const handleShowHome = () => {
    setShowHome(true);
  };

  // Estado para controlar el regreso a la página anterior
  const [back, setBack] = useState(false);

  // Función para regresar a la página anterior
  const btnBack = () => {
    setBack(true);
  };

  // Estado para controlar si se han realizado las operaciones de cálculo
  const [gOperaciones, setgOperaciones] = useState(false);

  // Función para actualizar los datos globales de costos
  const updateGlobalCostos = (key, value) => {
    window.globalCostos[key] = value;
  };

  // Función para calcular los costos
  const calCostos = () => {
    const cantidadInput = document.getElementById("cantidad").value;
    const tiempoInput = document.getElementById("tiempo").value;

    // Verificar si los campos están vacíos
    if (cantidadInput.trim() === "" || tiempoInput.trim() === "") {
      return;
    }

    // Convertir los valores a números enteros
    const cantidad = parseInt(cantidadInput, 10);
    const tiempo = parseInt(tiempoInput, 10);

    // Actualizar los datos globales de costos
    updateGlobalCostos("cantidad", cantidad);
    updateGlobalCostos("tiempo", tiempo);

    // Marcar que se han realizado las operaciones de cálculo
    setgOperaciones(true);
  };

  // Si se presiona el botón de regresar o se muestra la página de inicio, volver a la página de inicio
  if (back || showHome) {
    window.toHome = false;
    return <Home />;
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
          <div
            className="options-mPrima options"
            tabIndex="0"
            onClick={() => { (window.globalCostos.prenda = "Pantalon"); openPopup() }}
          >
            <img src="public/imgs/pantalones.png" alt="" />
            <p>Pantalon</p>
          </div>
          <div
            className="options-mObra options"
            tabIndex="0"
            onClick={() => { (window.globalCostos.prenda = "Camisa"); openPopup() }}
          >
            <img
              src="public/imgs/camisa.png
"
              alt=""
            />
            <p>Camisa</p>
          </div>
          <div
            className="options-cIndirectos options"
            tabIndex="0"
            onClick={() => { (window.globalCostos.prenda = "Falda"); openPopup() }}
          >
            <img src="public/imgs/falda.png" alt="" />
            <p>Falda</p>
          </div>
          <div
            className="options-cInformes options"
            tabIndex="0"
            onClick={() => { (window.globalCostos.prenda = "Vestido"); openPopup() }}
          >
            <img src="public/imgs/vestido.png" alt="" />
            <p>Vestido</p>
          </div>
        </div>
        {isPopupOpen &&
          <div className="container-popup">
            <div className="container-formCost">
              <div className="formC">
                <div className="optionsFormC">
                  <span className="spanCost">Cantidad</span>
                  <input
                    className="inputCost"
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    placeholder="0"
                    required
                  />
                </div>
                <div className="optionsFormC">
                  <span className="spanCost">Tiempo</span>
                  <input
                    className="inputCost"
                    type="number"
                    id="tiempo"
                    name="tiempo"
                    placeholder="horas"
                    required
                  />
                </div>
                <button className="calCost" onClick={calCostos}>
                  Enviar
                </button>
                <div>
                  {gOperaciones && (
                    <GestorOperaciones onShowHome={handleShowHome} />
                  )}
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};
