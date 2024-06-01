import React, { useState } from "react";
import Home from "./home-component";

const CostIndirectos = () => {
  // ---------boton back------------
  const [back, setBack] = useState(false);

  const btnBack = () => {
    setBack(true);
  };
  if (back) {
    return <Home />;
  }

  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Costos Indirectos</h1>
        <div className="formMP">
          <div className="optionsForm">
            <span>Alquiler Local</span>
            <input type="number" id="alquiler" name="alquiler" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>Servicios</span>
            <input type="number" id="uservicios" name="servicios" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>Mantenimiento</span>
            <input type="number" id="mant" name="mant" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>EPP</span>
            <input type="number" id="epp" name="epp" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>ForCapEmp</span>
            <input type="number" id="ForCapEmp" name="ForCapEmp" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>Seguros</span>
            <input type="number" id="Seguros" name="Seguros" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>GastosOficina</span>
            <input type="number" id="GastosOficina" name="GastosOficina" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>TransLog</span>
            <input type="number" id="TransLog" name="TransLog" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>LicPermisos</span>
            <input type="number" id="LicPermisos" name="LicPermisos" placeholder="$0.00" required />
          </div>
          <div className="optionsForm">
            <span>Limpieza</span>
            <input type="number" id="Limpieza" name="Limpieza" placeholder="$0.00" required />
          </div>
          <button className="add">Guardar</button>
        </div>
      </div>
    </>
  );
};

export default CostIndirectos;
