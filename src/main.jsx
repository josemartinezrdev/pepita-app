// Importar React y ReactDOM/client
import React from "react";
import ReactDOM from "react-dom/client";

// Importar el componente Home
import { Home } from "./web-components/home-component";

// Renderizar el componente Home dentro de un StrictMode utilizando createRoot
// StrictMode ayuda a identificar posibles problemas en la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);
