import React, { useState, useEffect } from "react";
import data from "../data/tipo.json";
window.globalEmpleado = {
  suelHora: 25,
  benPrest: 5,
};

export function GestorOperaciones() {
  const [apiData, setApiData] = useState([]);
  window.globalCostos.empleados = Math.ceil((window.globalCostos.cantidad * 4) / window.globalCostos.tiempo);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://665637279f970b3b36c4a8f5.mockapi.io/MateriaPrima");
      const dataFromApi = await response.json();
      setApiData(dataFromApi);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  useEffect(() => {
    // Aquí puedes integrar los datos de la API en tu lógica existente
    if (apiData.length > 0) {
      Object.keys(data).forEach((prenda) => {
        if (window.globalCostos.prenda === prenda) {
          let { prenda, cantidad, tiempo, empleados, TelaUsada, BotonUsado, CierreUsado, HiloUsado, costMano, costMateria, totalLote } = window.globalCostos;
          const { suelHora, benPrest } = window.globalEmpleado;
          window.globalCostos.TelaUsada = cantidad * data[prenda]["TelaUsada"];
          window.globalCostos.BotonUsado = cantidad * data[prenda]["BotonUsado"];
          window.globalCostos.CierreUsado = cantidad * data[prenda]["CierreUsado"];
          window.globalCostos.HiloUsado = cantidad * data[prenda]["HiloUsado"];
          window.globalCostos.costMano = empleados * (suelHora * tiempo + benPrest);
          // ------------------utilizar los datos del mockapi para usar los precios---------
          const [Tela, Hilo, Cierre, Boton] = apiData;
          window.globalCostos.costMateria = TelaUsada * Tela.costoUnidad + HiloUsado * Hilo.costoUnidad + CierreUsado * Cierre.costoUnidad + BotonUsado * Boton.costoUnidad;
        }
      });
    }
  }, [apiData]);

  const { prenda, cantidad, tiempo, empleados, TelaUsada, BotonUsado, CierreUsado, HiloUsado, costMano, costMateria, totalLote } = window.globalCostos;
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
