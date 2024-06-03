import React, { useState } from "react";
import { FormMateria } from "./form-materia-prima";
import { Home } from "./home-component";

export const MateriaComponent = () => {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  const [back, setBack] = useState(false);

  const btnClick = (name, id) => {
    setFirst(false);
    setSecond(true);
    window.globalOption = name;
    window.id = id;
  };

  const btnBack = () => {
    setBack(true);
  };

  if (back) {
    return <Home />;
  }

  return (
    <>
      {first ? (
        <div className="container-home">
          <button className="button" onClick={btnBack}>
            ← Volver
          </button>
          <img src="public/imgs/flores.png" alt="" className="lila" />
          <h1>Seleccione Tipo de Materia Prima</h1>
          <div className="option-home">
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
      {second ? <FormMateria /> : null}
    </>
  );
};
