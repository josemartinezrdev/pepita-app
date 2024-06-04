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
  window.veriStockBoton = true;
  window.veriStockCierre = true;
  window.veriStockHilo = true;

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
      setApiData(dataFromApi);
    } catch (error) {
      console.error("Error al obtener datos de Materia Prima:", error);
    }
  };

  const fetchIndirectCostsData = async () => {
    try {
      const response = await fetch(
        // Link de mockapi CostosIndirectos
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
    Object.keys(data).forEach((prendaKey) => {
      if (window.globalCostos.prenda === prendaKey) {
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
            window.veriStock = false;
          } else if (Boton.cantidadStock < window.globalCostos.BotonUsado) {
            window.veriStockBoton = false;
          } else if (Cierre.cantidadStock < window.globalCostos.CierreUsado) {
            window.veriStockCierre = false;
          } else if (Hilo.cantidadStock < window.globalCostos.HiloUsado) {
            window.veriStockHilo = false;
          }
          apiData[0]["cantidadStock"] -= window.globalCostos.TelaUsada;
          apiData[1]["cantidadStock"] -= window.globalCostos.HiloUsado;
          apiData[2]["cantidadStock"] -= window.globalCostos.CierreUsado;
          apiData[3]["cantidadStock"] -= window.globalCostos.BotonUsado;

          window.globalCostos.costMateria =
            window.globalCostos.TelaUsada * Tela.costoUnidad +
            window.globalCostos.HiloUsado * Hilo.costoUnidad +
            window.globalCostos.CierreUsado * Cierre.costoUnidad +
            window.globalCostos.BotonUsado * Boton.costoUnidad;
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
      console.log(window.globalStockMateria);
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

  const postGlobalStock = async () => {
    try {
      for (const atributo of apiData) {
        const response = await fetch(
          `https://665637279f970b3b36c4a8f5.mockapi.io/MateriaPrima/${atributo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(atributo),
          }
        );

        if (!response.ok) {
          throw new Error("Error al actualizar datos en MockAPI");
        }
      }

      console.log("Datos actualizados exitosamente apidata 🙂");
    } catch (error) {
      console.error("Error al actualizar datos en MockAPI:", error);
    }
  };

  // Efecto para calcular costos y enviarlos a la API
  useEffect(() => {
    if (apiData.length > 0 && indirectCostsData.length > 0 && !hasPosted) {
      calculateCosts();
      if (!window.veriStock) {
        alert("No hay suficiente stock de tela.");
        window.toHome = true;
      } else if (!window.veriStockBoton) {
        alert("No hay suficiente stock de Botones.");
        window.toHome = true;
      } else if (!window.veriStockCierre) {
        alert("No hay suficiente stock de Cierres.");
        window.toHome = true;
      } else if (!window.veriStockHilo) {
        alert("No hay suficiente stock de Hilo.");
        window.toHome = true;
      } else {
        postGlobalCostos();
        postGlobalStock();
        setHasPosted(true); // Marcar como posteado para evitar múltiples publicaciones
        alert("Lote creado con éxito");
        window.toHome = true;
      }
    }

    if (window.toHome) {
      onShowHome();
    }
  }, [apiData, indirectCostsData]);
}
