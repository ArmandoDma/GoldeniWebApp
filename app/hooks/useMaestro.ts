import { useEffect, useState } from "react";
import axios from "axios";

export interface Maestro {
  numeroEmpleado: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  genero: string;
  fechaNacimiento: string;
  telefono?: string;
  direccion?: string;
  codigoPostal?: string;
  idMunicipio?: number;
  idEstado?: number;
  especialidad: string;
  idTurno?: number;
  estadoMaestro?: string;
}

const API_URL = "http://localhost:5270/api/maestro";

export const useMaestro = () => {
  const [maestros, setMaestros] = useState<Maestro[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  // Cargar token sólo en cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token") || "";
      setToken(t);
    }
  }, []);

  // Obtener lista de maestros
  const fetchMaestros = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaestros(response.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener maestros");
    } finally {
      setLoading(false);
    }
  };

  // Crear maestro
  const crearMaestro = async (maestro: Maestro) => {
    if (!token) throw new Error("Token no disponible");
    setLoading(true);
    setError(null);
    try {
      console.log("Payload maestro:", maestro);
      const response = await axios.post(API_URL, maestro, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaestros((prev) => [...prev, response.data]);
      return response.data;
    } catch (e: any) {
      setError(e.response?.data?.error || "Error al crear maestro");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar maestro
  const actualizarMaestro = async (numeroEmpleado: string, maestro: Maestro) => {
    if (!token) throw new Error("Token no disponible");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/${numeroEmpleado}`, maestro, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaestros((prev) =>
        prev.map((m) => (m.numeroEmpleado === numeroEmpleado ? { ...m, ...maestro } : m))
      );
      return response.data;
    } catch (e: any) {
      setError(e.response?.data?.error || "Error al actualizar maestro");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Borrar maestro
  const borrarMaestro = async (numeroEmpleado: string) => {
    if (!token) throw new Error("Token no disponible");
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${numeroEmpleado}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMaestros((prev) => prev.filter((m) => m.numeroEmpleado !== numeroEmpleado));
    } catch (e: any) {
      setError(e.response?.data?.error || "Error al borrar maestro");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Auto cargar maestros cuando token esté listo
  useEffect(() => {
    if (token) {
      fetchMaestros();
    }
  }, [token]);

  return {
    maestros,
    loading,
    error,
    fetchMaestros,
    crearMaestro,
    actualizarMaestro,
    borrarMaestro,
  };
};
