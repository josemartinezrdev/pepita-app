import React, { useState, useEffect } from "react"; // Importacion de React y las funciones nativas de React
import { getData, getDataAll } from "../api-services/api-service"; // Importacion de las funciones para manejo de datos de la API
import { Home } from "./home-component"; // Importacion de Home

export const InformeComponent = () => {
  const [data, setData] = useState(null); // Estado para almacenar la data del lote seleccionado
  const [lotes, setLotes] = useState([]); // Estado para almacenar la lista a seleccionar de lotes
  const [LoteId, setLoteId] = useState(""); // Estado para almacenar el ID del lote seleccionado
  const [back, setBack] = useState(false); // Estado para gestionar el botón hacia atrás
  const [producto, setProducto] = useState([]); // Estado para almacenar los datos del producto

  useEffect(() => {
    fetchProducto();
  }, []);

  const fetchProducto = async () => {
    try {
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/TipoProducto"
      );
      const dataProducto = await response.json();
      setProducto(dataProducto);
    } catch (error) {
      console.error("Error al obtener datos de Producto:", error);
    }
  };

  // useEffect para obtener la lista de lotes cuando el componente se monta
  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const baseUrl = "https://665637279f970b3b36c4a8f5.mockapi.io"; // URL base de la API
        const endpoint = "Lotes"; // Endpoint para obtener los lotes
        const lotesData = await getDataAll(baseUrl, endpoint); // Obtener los datos de todos los lotes almacenados en la API
        setLotes(lotesData); // Actualiza el estado con la lista de lotes
      } catch (error) {
        console.error("Error al obtener los lotes:", error); // Manejo de errores
      }
    };

    fetchLotes();
  }, []);

  // useEffect para obtener los detalles del lote seleccionado
  useEffect(() => {
    if (LoteId) {
      const fetchLotDetails = async () => {
        try {
          const baseUrl = "https://665637279f970b3b36c4a8f5.mockapi.io"; // URL base de la API
          const endpoint = "Lotes"; // Endpoint para obtener los lotes
          const id = LoteId; // ID del lote seleccionado
          const loteData = await getData(baseUrl, endpoint, id); // Obtener los datos del lote seleccionado
          setData(loteData); // Actualiza el estado con la data del lote seleccionado
        } catch (error) {
          console.error("Error al obtener los detalles del lote:", error); // Manejo de errores
        }
      };

      fetchLotDetails();
    }
  }, [LoteId]);

  // Función para manejar el cambio de la selección del lote
  const handleLotChange = (e) => {
    setLoteId(e.target.value); // Actualiza el ID del lote seleccionado
  };

  // Función para manejar el botón hacia atrás
  const btnBack = () => {
    setBack(true); // Actualiza el estado para volver hacia atrás
  };

  // Renderiza el componente si el estado de back es true
  if (back) {
    return <Home />;
  }
  console.log(producto);
  // Renderiza el html con sus respectivos eventos y variables configuradas anteriormente
  return (
    <>
      <div className="container-infoLote">
        <button className="button" onClick={btnBack}>
          ← Volver
        </button>
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <div className="cont-producto">
          {producto.map((prod) => (
            <div key={prod.id} className="producto-item">
              <h1>{prod.Tipo}</h1>
              <h3>Tela Usada: {prod.TelaUsada}</h3>
              <h3>Botón Usado: {prod.BotonUsado}</h3>
              <h3>Cierre Usado: {prod.CierreUsado}</h3>
              <h3>Hilo Usado: {prod.HiloUsado}</h3>
            </div>
          ))}
        </div>
        <div className="infoLote">
          <h2>Costos Lote</h2>
          <div>
            <span>Seleccionar Lote:</span>
            <select id="lot-selector" value={LoteId} onChange={handleLotChange}>
              <option value="">Selecciona</option>
              {lotes.map((lot) => (
                <option key={lot.id} value={lot.id}>
                  Lote {lot.id}
                </option>
              ))}
            </select>
          </div>
          {data ? (
            <ul>
              <li>Prenda: {data.prenda}</li>
              <li>Cantidad: {data.cantidad}</li>
              <li>Tiempo: {data.tiempo}</li>
              <li>Empleados: {data.empleados}</li>
              <li>Tela Usada: {data.TelaUsada}</li>
              <li>Botón Usado: {data.BotonUsado}</li>
              <li>Cierre Usado: {data.CierreUsado}</li>
              <li>Hilo Usado: {data.HiloUsado}</li>
              <li>Costo de Mano de Obra: {data.costMano}</li>
              <li>Costo de Materiales: {data.costMateria}</li>
              <li>Total del Lote: {data.totalLote}</li>
            </ul>
          ) : (
            <span>Selecciona un lote para ver los detalles</span>
          )}
        </div>
      </div>
    </>
  );
};
