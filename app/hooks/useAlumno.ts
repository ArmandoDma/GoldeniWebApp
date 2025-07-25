import { useEffect, useState } from "react";
import axios from "axios";

export interface Alumno {
  matricula: string;
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
  idCarrera?: number;
  idTurno?: number;
  estadoAlumno?: string;
  idGrado?: number;
  idGrupo?: number;
  idPeriodo?: number;
}

const API_URL = "http://localhost:5270/api/Alumno";

export const useAlumno = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  // Cargar token solo en cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const t = localStorage.getItem("token") || "";
      setToken(t);
    }
  }, []);

  // Obtener lista de alumnos
  const fetchAlumnos = async () => {
    if (!token) return; // Esperar a que token esté cargado
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumnos(response.data);
    } catch (e: any) {
      setError(e.message || "Error al obtener alumnos");
    } finally {
      setLoading(false);
    }
  };

  // Crear alumno
  const crearAlumno = async (alumno: Alumno) => {
  if (!token) throw new Error("Token no disponible");
  setLoading(true);
  setError(null);
  try {
    console.log("json que se envía: ", alumno);
    const response = await axios.post(API_URL, alumno, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAlumnos((prev) => [...prev, response.data]);
    return response.data;
  } catch (e: any) {
    console.log("Error response data:", e.response?.data);

    const data = e.response?.data;

    if (data) {
      if (data.detalles) {
        // Si vienen detalles de errores de validación
        const mensajes = data.detalles
          .map(
            (d: any) => `${d.Campo}: ${d.Errores.join(", ")}`
          )
          .join("\n");
        setError(`Errores de validación:\n${mensajes}`);
      } else if (data.error) {
        setError(data.error);
      } else if (typeof data === "string") {
        setError(data);
      } else {
        setError("Error al crear alumno");
      }
    } else {
      setError("Error al crear alumno");
    }
    throw e;
  } finally {
    setLoading(false);
  }
};


  // Actualizar alumno
  const actualizarAlumno = async (matricula: string, alumno: Alumno) => {
    if (!token) throw new Error("Token no disponible");
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/${matricula}`, alumno, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumnos((prev) =>
        prev.map((a) => (a.matricula === matricula ? { ...a, ...alumno } : a))
      );
      return response.data;
    } catch (e: any) {
      setError(e.response?.data?.error || "Error al actualizar alumno");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Borrar alumno
  const borrarAlumno = async (matricula: string) => {
    if (!token) throw new Error("Token no disponible");
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/${matricula}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAlumnos((prev) => prev.filter((a) => a.matricula !== matricula));
    } catch (e: any) {
      setError(e.response?.data?.error || "Error al borrar alumno");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // Auto cargar la lista al usar el hook, solo cuando token esté listo
  useEffect(() => {
    if (token) {
      fetchAlumnos();
    }
  }, [token]);

  return {
    alumnos,
    loading,
    error,
    fetchAlumnos,
    crearAlumno,
    actualizarAlumno,
    borrarAlumno,
  };
};

