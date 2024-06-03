import React, { useState } from "react"; // Importacion de React y useState funcion nativa de React
import { MateriaComponent } from "./materia-component"; // Importacion del componente MateriaComponent
import { getData, putData } from "../api-services/api-service.jsx"; // Importacion de las funciones para gestiones la API

export const FormMateria = () => {
  const [back, setBack] = useState(false); // Estado para gestionar el boton de retroceso
  const [formData, setFormData] = useState({ // Estado para los datos de la materia prima
    nameProveedor: '',
    ubicacion: '',
    Cantidad: '',
    Descripcion: '',
    costo: '',
    notas: ''
  });

  // Funcion para gestionar el boton de retroceso
  const btnBack = () => {
    setBack(true); // Actualiza el estado para retroceder
  };

  // Renderiza el componente si el estado de back es true
  if (back) {
    return <MateriaComponent />;
  }

  // Funcion para manejar los cambios de los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuracion de name y value del evento
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza del estado del formulario
  };

  // Funcion para manejar el envio del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    try {
      const id = window.id; // Se guarda la ID del elemento seleccionado de la variable global
      const baseUrl = "https://665637279f970b3b36c4a8f5.mockapi.io"; // URL base de la API
      const endpoint = "MateriaPrima"; // Endpoint para acceder a materia prima

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
        fechaAdquisicion: new Date().toISOString().split("T")[0] // Actualiza la fecha de adquisicion con la fecha actual del momento que se envian los datos
      };

      await putData(baseUrl, endpoint, updatedData, id); // Enviar los datos actualizados a la API
      alert("Datos actualizados correctamente"); // Muestra un mensaje de exito
      setBack(true); // Vuelve a home despues de enviar los datos
    } catch (error){
      console.error('Error al actualizar los datos:', error); // Manejo de errores
    }
  };


  // Renderiza el html con sus respectivos eventos y variables configuradas anteriormente
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
