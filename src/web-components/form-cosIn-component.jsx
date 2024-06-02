import React, { useState } from "react";
import Home from "./home-component";
import { putData } from "../api-services/api-service.jsx";

window.globalTotal = 0;

const CostIndirectos = () => {
  // ---------boton back------------
  const [back, setBack] = useState(false);
  const [formData, setFormData] = useState({
    alquiler: '',
    servicios: '',
    mant: '',
    epp: '',
    ForCapEmp: '',
    Seguros: '',
    GastosOficina: '',
    TransLog: '',
    LicPermisos: '',
    Limpieza: ''
  });

  const btnBack = () => {
    setBack(true);
  };
  if (back) {
    return <Home />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = '1';
      const baseUrl = 'https://665637279f970b3b36c4a8f5.mockapi.io';
      const endpoint = 'CostosIndirectos';

      const updatedData = {
        AlquilerLocal: Number(formData.alquiler),
        Servicios: Number(formData.servicios),
        MantenimientoMaq: Number(formData.mant),
        EPP: Number(formData.epp),
        ForCapEmp: Number(formData.ForCapEmp),
        Seguros: Number(formData.Seguros),
        GastosOficina: Number(formData.GastosOficina),
        TransLog: Number(formData.TransLog),
        LicPermisos: Number(formData.LicPermisos),
        Limpieza: Number(formData.Limpieza),
        Total: Number(formData.alquiler) + Number(formData.servicios) + Number(formData.mant) + Number(formData.epp) + Number(formData.ForCapEmp) + Number(formData.Seguros) + Number(formData.GastosOficina) + Number(formData.TransLog) + Number(formData.LicPermisos) + Number(formData.Limpieza)
      };

      window.globalTotal = updatedData.Total;

      await putData(baseUrl, endpoint, updatedData, id);
      alert('Datos actualizados correctamente');
      setBack(true);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }

  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Costos Indirectos</h1>
        <form className="formMP" onSubmit={handleSubmit}>
          <div className="optionsForm">
            <span>Alquiler Local</span>
            <input
              type="number" id="alquiler"
              name="alquiler"
              placeholder="$0.00"
              value={formData.alquiler}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>Servicios</span>
            <input
              type="number"
              id="uservicios"
              name="servicios"
              placeholder="$0.00"
              value={formData.servicios}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>Mantenimiento</span>
            <input
              type="number"
              id="mant"
              name="mant"
              placeholder="$0.00"
              value={formData.mant}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>EPP</span>
            <input
              type="number"
              id="epp"
              name="epp"
              placeholder="$0.00"
              value={formData.epp}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>ForCapEmp</span>
            <input
              type="number"
              id="ForCapEmp"
              name="ForCapEmp"
              placeholder="$0.00"
              value={formData.ForCapEmp}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>Seguros</span>
            <input
              type="number"
              id="Seguros"
              name="Seguros"
              placeholder="$0.00"
              value={formData.Seguros}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>GastosOficina</span>
            <input
              type="number"
              id="GastosOficina"
              name="GastosOficina"
              placeholder="$0.00"
              value={formData.GastosOficina}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>TransLog</span>
            <input
              type="number"
              id="TransLog"
              name="TransLog"
              placeholder="$0.00"
              value={formData.TransLog}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>LicPermisos</span>
            <input
              type="number"
              id="LicPermisos"
              name="LicPermisos"
              placeholder="$0.00"
              value={formData.LicPermisos}
              onChange={handleChange}
              required />
          </div>
          <div className="optionsForm">
            <span>Limpieza</span>
            <input
              type="number"
              id="Limpieza"
              name="Limpieza"
              placeholder="$0.00"
              value={formData.Limpieza}
              onChange={handleChange}
              required />
          </div>
          <button className="add" type="submit">Guardar</button>
        </form>
      </div>
    </>
  );
};

export default CostIndirectos;
