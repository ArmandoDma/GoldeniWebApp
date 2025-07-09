import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface Extra {
  id: number;
  categoria: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  cupo: number;
  lugar: string;
  tipo: "Evento" | "Taller";
  precio: number;
  imagenEvent: string;
}

export const useEvents = (tipo?: string) => {
  const [events, setEvents] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) throw new Error("No token found");

        const decoded: any = jwtDecode(token);
        let url = "http://localhost:5270/api/extracurricular";
        if (tipo) {
          url += `?tipo=${encodeURIComponent(tipo)}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data)
        setEvents(response.data);
      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [tipo]);

  return { events, loading, error };
};
