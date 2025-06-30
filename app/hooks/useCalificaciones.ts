import { useEffect, useState } from "react";
import axios from "axios";

export interface Calificacion {
  materia?: number;
  parcial1: number;
  parcial2: number;
  parcial3: number;
  final: number;
}

export const useCalificaciones = () => {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token no encontrado");

        const response = await axios.get(
          "http://localhost:5270/api/auth/calificaciones",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setCalificaciones(response.data);
      } catch (e: any) {
        setError(e.message || "Error al obtener calificaciones");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { calificaciones, loading, error };
};
