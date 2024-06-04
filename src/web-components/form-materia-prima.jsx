import React, { useState, useEffect } from "react"; // Importación de React y useState, useEffect
import { MateriaComponent } from "./materia-component"; // Importación del componente MateriaComponent
import { getData, putData } from "../api-services/api-service.jsx"; // Importación de las funciones para gestionar la API

export const FormMateria = () => {
  const [back, setBack] = useState(false); // Estado para gestionar el botón de retroceso
  const [formData, setFormData] = useState({ // Estado para los datos del formulario
    nameProveedor: '',
    ubicacion: '',
    Cantidad: '',
    Descripcion: '',
    costo: '',
    notas: ''
  });
  const [materia, setMateria] = useState([]); // Estado para almacenar los datos del producto
  const [selectedMateria, setSelectedMateria] = useState(null); // Estado para almacenar el objeto seleccionado
  const [idToFind, setIdToFind] = useState(null); // Estado para almacenar el ID a buscar
  const [isPopupOpen, setPopupOpen] = useState(false);

  const closePopup = () => {
    setPopupOpen(false);
    setBack(true);
  }

  // Traemos las Materias Primas del mockapi para mostrar la existente
  useEffect(() => {
    fetchMateria();
  }, []);

  useEffect(() => {
    if (idToFind !== null) {
      const foundMateria = materia.find((item) => item.id === idToFind);
      setSelectedMateria(foundMateria);
    }
  }, [idToFind, materia]);

  const fetchMateria = async () => {
    try {
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/MateriaPrima"
      );
      const dataMateria = await response.json();
      setMateria(dataMateria);
      // Asignar el ID que deseas buscar (por ejemplo, se obtiene de alguna parte de la aplicación)
      const idFromGlobal = window.id || 1; // Reemplaza con la lógica adecuada para obtener el ID
      setIdToFind(idFromGlobal);
    } catch (error) {
      console.error("Error al obtener datos de Producto:", error);
    }
  };

  // Función para gestionar el botón de retroceso
  const btnBack = () => {
    setBack(true); // Actualiza el estado para retroceder
  };

  // Renderiza el componente si el estado de back es true
  if (back) {
    return <MateriaComponent />;
  }

  // Función para manejar los cambios de los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructuración de name y value del evento
    setFormData((prevData) => ({ ...prevData, [name]: value })); // Actualiza el estado del formulario
  };

  // Función para manejar el envío del formulario
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
        fechaAdquisicion: new Date().toISOString().split("T")[0] // Actualiza la fecha de adquisición con la fecha actual del momento que se envían los datos
      };

      await putData(baseUrl, endpoint, updatedData, id); // Enviar los datos actualizados a la API
      setPopupOpen(true); // Muestra un mensaje de éxito
    } catch (error) {
      console.error('Error al actualizar los datos:', error); // Manejo de errores
    }
  };

  // Renderiza el HTML con sus respectivos eventos y variables configuradas anteriormente
  return (
    <>
      <div className="container-formMP">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Ingresar Materia Prima</h1>
        <h1>{window.globalOption}</h1>
        <div className="cont-formMockMateriaP">
          <form className="formMP" onSubmit={handleSubmit}>
            <div className="optionsForm">
              <span>Proveedor</span>
              <input type="text" id="nameProveedor" name="nameProveedor" placeholder="Nombre/s Proveedor" value={formData.nameProveedor} onChange={handleChange} required />
            </div>
            <div className="optionsForm">
              <span>Ubicación</span>
              <select id="ubicacion" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required>
                <option value="">Selecciona una ubicación</option>
                <option value="Sección A">Sección A</option>
                <option value="Sección B">Sección B</option>
                <option value="Sección C">Sección C</option>
              </select>
            </div>
            <div className="optionsForm">
              <span>Cantidad</span>
              <input type="number" id="Cantidad" name="Cantidad" placeholder="0" value={formData.Cantidad} onChange={handleChange} required />
            </div>
            <div className="optionsForm">
              <span>Descripción</span>
              <input type="text" id="Descripcion" name="Descripcion" placeholder="Descripción" value={formData.Descripcion} onChange={handleChange} required />
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
          <div className="info-materiaP">
            {selectedMateria ? (
              <ul>
                <li><span>Nombre: </span>{selectedMateria.nombre}</li>
                <li><span>Descripción:</span> {selectedMateria.descripcion}</li>
                <li><span>Categoría:</span> {selectedMateria.categoria}</li>
                <li><span>Proveedor:</span> {selectedMateria.proveedor}</li>
                <li><span>Costo Unidad:</span> {selectedMateria.costoUnidad}</li>
                <li><span>Unidad de Medida:</span> {selectedMateria.unidadMedida}</li>
                <li><span>Cantidad Stock:</span> {selectedMateria.cantidadStock}</li>
                <li><span>Fecha Adquisición:</span> {selectedMateria.fechaAdquisicion}</li>
                <li><span>Fecha Vencimiento:</span> {selectedMateria.fechaVencimiento}</li>
                <li><span>Ubicación Almacen:</span> {selectedMateria.ubicacionAlmacen}</li>
                <li><span>Notas Adicionales:</span> {selectedMateria.notasAdicionales}</li>
              </ul>
            ) : (
              <p>Loading...</p>
            )}
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
          </div>
        </div>
      </div>
    </>
  );
};