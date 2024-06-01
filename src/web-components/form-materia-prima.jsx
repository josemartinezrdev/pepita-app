import React, { useState } from "react";
import { MateriaComponent } from "./materia-component";

export const FormMateria = () => {
  const [back, setBack] = useState(false);

  const btnBack = () => {
    setBack(true);
  };

  if (back) {
    return <MateriaComponent />;
  }

  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Materia Prima</h1>
        <h1>{window.globalOption}</h1>
        <div className="formMP">
          <div className="optionsForm">
            <span>Nombre Proveedor</span>
            <input type="text" id="nameProveedor" name="name" placeholder="Nombre/s Proveedor" required />
          </div>
          <div className="optionsForm">
            <span>Ubicación</span>
            <input type="text" id="ubicacion" name="ubicacion" placeholder="Ubicación" required />
          </div>
          <div className="optionsForm">
            <span>Cantidad</span>
            <input type="number" id="Cantidad" name="Cantidad" placeholder="0" required />
          </div>
          <div className="optionsForm">
            <span>Descripción</span>
            <input type="text" id="Descripcion" name="Descripcion" placeholder="Descripcion" required />
          </div>
          <div className="optionsForm">
            <span>Costo Por Unidad</span>
            <input type="number" id="costo" name="costo" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>Notas Adicionales</span>
            <input type="text" id="notas" name="notas" placeholder="Notas" required />
          </div>
          <button className="add">Agregar</button>
        </div>
      </div>
    </>
  );
};
