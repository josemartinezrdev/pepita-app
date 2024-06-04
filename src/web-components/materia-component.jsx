import React, { useState } from "react";
import { FormMateria } from "./form-materia-prima";
import { Home } from "./home-component";

export const MateriaComponent = () => {
  // Estados para controlar la visualización de los elementos
  const [first, setFirst] = useState(true); // Mostrar selección de tipo de materia prima
  const [second, setSecond] = useState(false); // Mostrar formulario para agregar información
  const [back, setBack] = useState(false); // Controlar el regreso a la página principal

  // Función para cambiar a la segunda pantalla y almacenar la opción seleccionada
  const btnClick = (name, id) => {
    setFirst(false);
    setSecond(true);
    window.globalOption = name; // Almacenar la opción seleccionada
    window.id = id; // Almacenar el ID de la opción seleccionada
  };

  // Función para volver a la página principal
  const btnBack = () => {
    setBack(true);
  };

  // Si se presiona el botón de regreso, volver a la página principal
  if (back) {
    return <Home />;
  }

  return (
    <>
      {first ? (
        // Mostrar la primera pantalla para seleccionar el tipo de materia prima
        <div className="container-home">
          <button className="button" onClick={btnBack}>
            ← Volver
          </button>
          <img src="public/imgs/flores.png" alt="" className="lila" />
          <h1>Seleccione Tipo de Materia Prima</h1>
          <div className="option-home">
            {/* Opciones para seleccionar el tipo de materia prima */}
            <div
              className="options-mPrima options"
              tabIndex="0"
              onClick={() => btnClick("tela", "1")}
            >
              <img src="public/imgs/tela.png" alt="" />
              <p>Telas</p>
            </div>
            <div
              className="options-mObra options"
              tabIndex="0"
              onClick={() => btnClick("hilo", "2")}
            >
              <img src="public/imgs/hilo.png" alt="" />
              <p>Hilos</p>
            </div>
            <div
              className="options-cIndirectos options"
              tabIndex="0"
              onClick={() => btnClick("boton", "3")}
            >
              <img src="public/imgs/botones.png" alt="" />
              <p>Botones</p>
            </div>
            <div
              className="options-cInformes options"
              tabIndex="0"
              onClick={() => btnClick("cierre", "4")}
            >
              <img src="public/imgs/cremallera.png" alt="" />
              <p>Cierres</p>
            </div>
          </div>
        </div>
      ) : null}
      {second ? <FormMateria /> : null} {/* Mostrar el formulario para agregar información de la materia prima */}
    </>
  );
};
