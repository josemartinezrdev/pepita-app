import React, { useState, useEffect } from "react";
import { getData, getDataAll } from "../api-services/api-service";
import {Home} from "./home-component";

export const InformeComponent = () => {
    const [data, setData] = useState(null);
    const [lotes, setLotes] = useState([]);
    const [LoteId, setLoteId] = useState('');
    const [back, setBack] = useState(false);

    useEffect(() => {
        const fetchLotes = async () => {
            try {
                const baseUrl = 'https://665637279f970b3b36c4a8f5.mockapi.io';
                const endpoint = 'Lotes';
                const lotesData = await getDataAll(baseUrl, endpoint);
                setLotes(lotesData);
            } catch (error) {
                console.error('Error al obtener los lotes:', error);
            }
        };

        fetchLotes();
    }, []);

    useEffect(() => {
        if (LoteId) {
            const fetchLotDetails = async () => {
                try {
                    const baseUrl = 'https://665637279f970b3b36c4a8f5.mockapi.io';
                    const endpoint = 'Lotes';
                    const id = LoteId;
                    const loteData = await getData(baseUrl, endpoint, id);
                    setData(loteData);
                } catch (error) {
                    console.error('Error al obtener los detalles del lote:', error);
                }
            };

            fetchLotDetails();
        }
    }, [LoteId]);

    const handleLotChange = (e) => {
        setLoteId(e.target.value);
    };

    const btnBack = () => {
        setBack(true);
    };

    if (back) {
        return <Home />;
    }

    return (
        <>
            <div className="container-infoLote">
                <button className="button" onClick={btnBack}>
                    ← Volver
                </button>
                <img src="public/imgs/flores.png" alt="" className="lila" />
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
