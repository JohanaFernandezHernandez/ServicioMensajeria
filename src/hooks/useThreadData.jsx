import axios from "axios";
import { useEffect } from "react";
import { useStore } from "../Stores/store";
const CFSKEY = import.meta.env.VITE_CFSKEY;
const CFSTOKEN = import.meta.env.VITE_CFSTOKEN;

export const useThreadData = () => {
  const { setThreadData, setLoading, setError } = useStore((state) => ({
    setThreadData: state.setThreadData,
    setLoading: state.setLoading,
    setError: state.setError,
  }));

  //Obtener el hilo
  const getHilo = async () => {
    try {
      const response = await axios.get(
        `https://api-sandbox.confirmsign.com/v4.0/threads/token/${CFSKEY}/${CFSTOKEN}`
      );

      if (response.status === 200) {
        setThreadData(response.data);
      }
    } catch (error) {
      console.log("Error al obtener el hilo", error);
      throw error;
    }
  };

  //Envió post al aceptar el hilo
  const acceptHilo = async (threadData) => {
    try {
      const response = await axios.post(
        `https://api-sandbox.confirmsign.com/v4.0/threads/token/${CFSKEY}/${CFSTOKEN}/agreement/true`,
        [threadData],
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );

      if (response.status === 201) {
        setThreadData(response.data);
        console.log("Hilo aceptado");
      }
    } catch (error) {
      console.log("no se pudo aceptar el hilo", error);
      throw error;
    }
  };

  return {
    getHilo,
    acceptHilo,
  };
};
