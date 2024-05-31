import React, { useState } from "react";
import { MateriaComponent } from "./materia-component";

const Home = () => {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);

  const btnClick = () => {
    setFirst(false);
    setSecond(true);
  };

  return (
    <>
      {first ? (
        <div className="container-home">
          <img src="public/imgs/flores.png" alt="" className="lila" />
          <h1>Bienvenido a PeppitaApp</h1>
          <h2>¿Qué Deseas Hacer Hoy?</h2>
          <div className="option-home">
            <div
              className="options-mPrima options"
              tabIndex="0"
              onClick={btnClick}
            >
              <img src="public/imgs/materiaPrima.png" alt="" />
              <p>Gestionar Materia Prima</p>
            </div>
            <div className="options-mObra options" tabIndex="0">
              <img src="public/imgs/manoObra.png" alt="" />
              <p>Mano de Obra</p>
            </div>
            <div className="options-cIndirectos options" tabIndex="0">
              <img src="public/imgs/costIndirectos.png" alt="" />
              <p>Costos Indirectos</p>
            </div>
            <div className="options-cInformes options" tabIndex="0">
              <img src="public/imgs/informes.png" alt="" />
              <p>Informes</p>
            </div>
          </div>
        </div>
      ) : null}
      {second ? <MateriaComponent /> : null}
    </>
  );
};

export default Home;
