import React from "react";
import data from "../data/tipo.json";

// window.globalCostos = {
//     !prenda: "",
//     !cantidad: 0,
//     !tiempo: 0,
//     !empleados: 0,
//     !TelaUsada: 0,
//     !BotonUsado: 0,
//     !CierreUsado: 0,
//     !HiloUsado: 0,
//     costMano:0,
//     costMateria:0,
//     totalLote:0

//   };
window.globalEmpleado = {
  suelHora: 25,
  benPrest: 5,
};

export const GestorOperaciones = () => {
  // ------------------add empleados---------------
  window.globalCostos.empleados = (window.globalCostos.cantidad * 4) / window.globalCostos.tiempo;

  const { 1: pantalon, 2: camisa, 3: falda, 4: vestido } = data;

  Object.keys(data).forEach((prenda) => {
    if (window.globalCostos.prenda === prenda) {
      console.log(data[prenda]["BotonUsado"]);
      window.globalCostos.TelaUsada = window.globalCostos.cantidad * data[prenda]["TelaUsada"];
      window.globalCostos.BotonUsado = window.globalCostos.cantidad * data[prenda]["BotonUsado"];
      window.globalCostos.CierreUsado = window.globalCostos.cantidad * data[prenda]["CierreUsado"];
      window.globalCostos.HiloUsado = window.globalCostos.cantidad * data[prenda]["HiloUsado"];
    }
  });
  console.log(window.globalCostos);

  return <div>GestorOperaciones</div>;
};
