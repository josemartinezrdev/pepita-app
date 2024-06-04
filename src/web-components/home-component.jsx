// Importamos las dependencias necesarias de React y otros componentes
import React, { useState } from "react";
import { MateriaComponent } from "./materia-component";
import { CostosComponent } from "./costos-component";
import { InformeComponent } from './informe-component';
import CostIndirectos from "./form-cosIn-component";

// Definimos un objeto global para almacenar los costos
window.globalCostos = {
  prenda: "",
  cantidad: 0,
  tiempo: 0,
  empleados: 0,
  TelaUsada: 0,
  BotonUsado: 0,
  CierreUsado: 0,
  HiloUsado: 0,
  costMano: 0,
  costMateria: 0,
  totalLote: 0,
};

// Definimos el componente principal Home
export const Home = () => {
  // Usamos el hook useState para gestionar el estado de control
  const [control, setControl] = useState(null);

  // Usamos un switch para renderizar diferentes componentes según el valor de control
  switch (control) {
    case 1:
      return <MateriaComponent />;
    case 2:
      return <CostosComponent />;
    case 3:
      return <CostIndirectos />;
    case 4:
      return <InformeComponent />;
    default:
      break;
  }

  // Renderizamos la interfaz principal cuando control es null o no coincide con ningún caso del switch
  return (
    <>
      <div className="container-home">
        <img src="public/imgs/flores.png" alt="" className="lila" />
        <h1>Bienvenido a PeppitaApp</h1>
        <h2>¿Qué Deseas Hacer Hoy?</h2>
        <div className="option-home">
          {/* Opción para gestionar materia prima */}
          <div
            className="options-mPrima options"
            tabIndex="0"
            onClick={() => setControl(1)}
          >
            <img src="public/imgs/materiaPrima.png" alt="" />
            <p>Gestionar Materia Prima</p>
          </div>
          {/* Opción para gestionar mano de obra */}
          <div
            className="options-mObra options"
            tabIndex="0"
            onClick={() => setControl(2)}
          >
            <img src="public/imgs/manoObra.png" alt="" />
            <p>Mano de Obra</p>
          </div>
          {/* Opción para gestionar costos indirectos */}
          <div
            className="options-cIndirectos options"
            tabIndex="0"
            onClick={() => setControl(3)}
          >
            <img src="public/imgs/costIndirectos.png" alt="" />
            <p>Costos Indirectos</p>
          </div>
          {/* Opción para ver informes */}
          <div
            className="options-cInformes options"
            tabIndex="0"
            onClick={() => setControl(4)}
          >
            <img src="public/imgs/informes.png" alt="" />
            <p>Informes</p>
          </div>
        </div>
      </div>
    </>
  );
};
