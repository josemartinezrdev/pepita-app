import React, { useState } from "react";
import { MateriaComponent } from "./materia-component";
import { getData, putData } from "../api-services/api-service.jsx";

export const FormMateria = () => {
  const [back, setBack] = useState(false);
  const [formData, setFormData] = useState({
    nameProveedor: '',
    ubicacion: '',
    Cantidad: '',
    Descripcion: '',
    costo: '',
    notas: ''
  });

  const btnBack = () => {
    setBack(true);
  };

  if (back) {
    return <MateriaComponent />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = window.id;
      const baseUrl = "https://665637279f970b3b36c4a8f5.mockapi.io";
      const endpoint = "MateriaPrima";

      // Obtener los datos actuales del elemento a actualizar
      const currentData = await getData(baseUrl, endpoint, id);
      const newStock = Number(currentData.cantidadStock) + Number(formData.Cantidad);
      // Actualizar solo los campos del formulario en los datos actuales
      const updatedData = {
        ...currentData,
        proveedor: formData.nameProveedor,
        ubicacionAlmacen: formData.ubicacion,
        cantidadStock: newStock,
        descripcion: formData.Descripcion,
        costoUnidad: Number(formData.costo),
        notasAdicionales: formData.notas,
        fechaAdquisicion: new Date().toISOString().split("T")[0],
      };

      await putData(baseUrl, endpoint, updatedData, id);
      alert("Datos actualizados correctamente");
      setBack(true);
    } catch (error){
      console.error('Error al actualizar los datos:', error);
    }
  };

  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Materia Prima</h1>
        <h1>{window.globalOption}</h1>
        <form className="formMP" onSubmit={handleSubmit}>
          <div className="optionsForm">
            <span>Nombre Proveedor</span>
            <input type="text" id="nameProveedor" name="nameProveedor" placeholder="Nombre/s Proveedor" value={formData.nameProveedor} onChange={handleChange} required />
          </div>
          <div className="optionsForm">
            <span>Ubicación</span>
            <select id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required>
              <option value="">Selecciona una ubicacion</option>
              <option value="Seccion A">Seccion A</option>
              <option value="Seccion B">Seccion B</option>
              <option value="Seccion C">Seccion C</option>
            </select>
          </div>
          <div className="optionsForm">
            <span>Cantidad</span>
            <input type="number" id="Cantidad" name="Cantidad" placeholder="0" value={formData.Cantidad} onChange={handleChange} required />
          </div>
          <div className="optionsForm">
            <span>Descripción</span>
            <input type="text" id="Descripcion" name="Descripcion" placeholder="Descripcion" value={formData.Descripcion} onChange={handleChange} required />
          </div>
          <div className="optionsForm">
            <span>Costo Por Unidad</span>
            <input type="number" id="costo" name="costo" placeholder="$0.00" value={formData.costo} onChange={handleChange} required />
          </div>
          <div className="optionsForm">
            <span>Notas Adicionales</span>
            <input type="text" id="notas" name="notas" placeholder="Notas" value={formData.notas} onChange={handleChange} required />
          </div>
          <button className="add" type="submit">
            Agregar
          </button>
        </form>
      </div>
    </>
  );
};
