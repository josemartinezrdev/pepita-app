import React, { useState, useEffect } from "react";
import { Home } from "./home-component";
import { putData } from "../api-services/api-service.jsx";

const CostIndirectos = () => {
  const [back, setBack] = useState(false);
  const [indirectos, setIndirectos] = useState([]);
  const [formData, setFormData] = useState({
    alquiler: "",
    servicios: "",
    mant: "",
    epp: "",
    ForCapEmp: "",
    Seguros: "",
    GastosOficina: "",
    TransLog: "",
    LicPermisos: "",
    Limpieza: "",
  });
  const [isPopupOpen, setPopupOpen] = useState(false);

  const closePopup = () => {
    setPopupOpen(false);
    setBack(true);
  }

  useEffect(() => {
    fetchIndirectos();
  }, []);

  const fetchIndirectos = async () => {
    try {
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/CostosIndirectos"
      );
      const dataFromApi = await response.json();
      setIndirectos(dataFromApi);
    } catch (error) {
      console.error("Error al obtener datos de Materia Prima:", error);
    }
  };

  const btnBack = () => {
    setBack(true);
  };
  if (back) {
    return <Home />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = "1";
      const baseUrl = "https://665637279f970b3b36c4a8f5.mockapi.io";
      const endpoint = "CostosIndirectos";

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
        Total:
          Number(formData.alquiler) +
          Number(formData.servicios) +
          Number(formData.mant) +
          Number(formData.epp) +
          Number(formData.ForCapEmp) +
          Number(formData.Seguros) +
          Number(formData.GastosOficina) +
          Number(formData.TransLog) +
          Number(formData.LicPermisos) +
          Number(formData.Limpieza),
      };

      await putData(baseUrl, endpoint, updatedData, id);
      setPopupOpen(true);
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  if (!indirectos.length) {
    return <div>Cargando datos...</div>;
  }

  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Costos Indirectos</h1>
        <div className="cont-costIndirectos">
          <div className="indirectos">
            <ul>
              <li>
                <span>AlquilerLocal: </span>
                {indirectos[0]?.AlquilerLocal}
              </li>
              <li>
                <span>Servicios:</span> {indirectos[0]?.Servicios}
              </li>
              <li>
                <span>MantenimientoMaq:</span> {indirectos[0]?.MantenimientoMaq}
              </li>
              <li>
                <span>EPP:</span> {indirectos[0]?.EPP}
              </li>
              <li>
                <span>ForCapEmp:</span> {indirectos[0]?.ForCapEmp}
              </li>
              <li>
                <span>Seguros:</span> {indirectos[0]?.Seguros}
              </li>
              <li>
                <span>GastosOficina:</span> {indirectos[0]?.GastosOficina}
              </li>
              <li>
                <span>TransLog:</span> {indirectos[0]?.TransLog}
              </li>
              <li>
                <span>LicPermisos:</span> {indirectos[0]?.LicPermisos}
              </li>
              <li>
                <span>Limpieza:</span> {indirectos[0]?.Limpieza}
              </li>
              <li>
                <span>Total:</span> {indirectos[0]?.Total}
              </li>
            </ul>
          </div>

          <form className="formMP" onSubmit={handleSubmit}>
            <div className="optionsForm">
              <span>Alquiler Local</span>
              <input
                type="number"
                id="alquiler"
                name="alquiler"
                placeholder="$0.00"
                value={formData.alquiler}
                onChange={handleChange}
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
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
                required
              />
            </div>
            <button className="add" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
      {isPopupOpen &&
        <div className="container-popup">
          <div className="popup">
            <img src="/public/imgs/good.png" alt="success" />
            <h2>Exitoso!</h2>
            <p>Datos Actualizados correctamente</p>
            <button type="button" onClick={closePopup}>OK</button>
          </div>
        </div>
      }
    </>
  );
};

export default CostIndirectos;
