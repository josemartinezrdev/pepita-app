import React, { useState, useEffect } from "react";
import data from "../data/tipo.json";

// Variables globales
window.toHome = false;
window.globalEmpleado = {
  suelHora: 25,
  benPrest: 5,
};

export function GestorOperaciones({ onShowHome }) {
  // Estados para almacenar datos de la API y costos indirectos
  const [apiData, setApiData] = useState([]);
  const [indirectCostsData, setIndirectCostsData] = useState([]);
  const [hasPosted, setHasPosted] = useState(false);

  // Variable global para verificar stock
  window.veriStock = true;

  // Funciones para obtener datos de la API
  useEffect(() => {
    fetchData();
    fetchIndirectCostsData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/MateriaPrima"
      );
      const dataFromApi = await response.json();
      console.log("Materia Prima Data:", dataFromApi);
      setApiData(dataFromApi);
    } catch (error) {
      console.error("Error al obtener datos de Materia Prima:", error);
    }
  };

  const fetchIndirectCostsData = async () => {
    try {
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/CostosIndirectos"
      );
      const dataFromApi = await response.json();
      console.log("Costos Indirectos Data:", dataFromApi);
      setIndirectCostsData(dataFromApi);
    } catch (error) {
      console.error("Error al obtener datos de Costos Indirectos:", error);
    }
  };

  // Función para calcular costos
  const calculateCosts = () => {
    console.log("Calculando costos...");

    Object.keys(data).forEach((prendaKey) => {
      if (window.globalCostos.prenda === prendaKey) {
        console.log("Prenda encontrada:", prendaKey);
        let { cantidad, tiempo } = window.globalCostos;
        const { suelHora, benPrest } = window.globalEmpleado;

        // Calcular el número de empleados
        const empleados = Math.ceil((cantidad * 4) / tiempo);
        window.globalCostos.empleados = empleados;

        // Calcular el uso de materiales
        window.globalCostos.TelaUsada = cantidad * data[prendaKey]["TelaUsada"];
        window.globalCostos.BotonUsado =
          cantidad * data[prendaKey]["BotonUsado"];
        window.globalCostos.CierreUsado =
          cantidad * data[prendaKey]["CierreUsado"];
        window.globalCostos.HiloUsado = cantidad * data[prendaKey]["HiloUsado"];

        // Calcular el costo de mano de obra
        window.globalCostos.costMano =
          empleados * (suelHora * tiempo + benPrest);
        console.log("Costo de Mano de Obra:", window.globalCostos.costMano);

        // Verificar si las propiedades existen en los objetos obtenidos
        const [Tela, Hilo, Cierre, Boton] = apiData;
        if (Tela && Hilo && Cierre && Boton) {
          if (Tela.cantidadStock < window.globalCostos.TelaUsada) {
            console.log("Pailas no le alcanza la tela");
            window.veriStock = false;
          }
          window.globalCostos.costMateria =
            window.globalCostos.TelaUsada * Tela.costoUnidad +
            window.globalCostos.HiloUsado * Hilo.costoUnidad +
            window.globalCostos.CierreUsado * Cierre.costoUnidad +
            window.globalCostos.BotonUsado * Boton.costoUnidad;
          console.log("Costo de Materiales:", window.globalCostos.costMateria);
        } else {
          console.error(
            "Datos de Materia Prima no contienen las propiedades esperadas"
          );
        }

        // Calcular el total del lote
        let a = indirectCostsData[0]?.Total / 5000;
        let b = a * cantidad;
        window.globalCostos.totalLote =
          b + window.globalCostos.costMano + window.globalCostos.costMateria;
        console.log("Total del Lote:", window.globalCostos.totalLote);
      }
    });
  };

  // Función para enviar los costos globales a la API
  const postGlobalCostos = async () => {
    try {
      console.log("Datos a subir:", window.globalCostos);
      const response = await fetch(
        "https://665637279f970b3b36c4a8f5.mockapi.io/Lotes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(window.globalCostos),
        }
      );
      if (!response.ok) {
        throw new Error("Error al subir datos a MockAPI");
      }
      console.log("Datos subidos exitosamente");
    } catch (error) {
      console.error("Error al subir datos a MockAPI:", error);
    }
  };

  // Efecto para calcular costos y enviarlos a la API
  useEffect(() => {
    if (apiData.length > 0 && indirectCostsData.length > 0 && !hasPosted) {
      calculateCosts();
      if (!window.veriStock) {
        alert("No hay suficiente stock de tela.");
        window.toHome = true;
      } else {
        postGlobalCostos();
        setHasPosted(true); // Marcar como posteado para evitar múltiples publicaciones
        window.toHome = true;
      }
    }

    if (window.toHome) {
      onShowHome();
    }
  }, [apiData, indirectCostsData]);

  // Renderizado de los resultados de los cálculos
  const {
    prenda,
    cantidad,
    tiempo,
    empleados,
    TelaUsada,
    BotonUsado,
    CierreUsado,
    HiloUsado,
    costMano,
    costMateria,
    totalLote,
  } = window.globalCostos;

  return (
    <>
      <div>
        <h2>Costos</h2>
        <ul>
          <li>Prenda: {prenda}</li>
          <li>Cantidad: {cantidad}</li>
          <li>Tiempo: {tiempo}</li>
          <li>Empleados: {empleados}</li>
          <li>Tela Usada: {TelaUsada}</li>
          <li>Botón Usado: {BotonUsado}</li>
          <li>Cierre Usado: {CierreUsado}</li>
          <li>Hilo Usado: {HiloUsado}</li>
          <li>Costo de Mano de Obra: {costMano}</li>
          <li>Costo de Materiales: {costMateria}</li>
          <li>Total del Lote: {totalLote}</li>
        </ul>
      </div>
    </>
  );
}
