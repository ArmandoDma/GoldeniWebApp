import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface Profile {
  nombreCompleto: string;
  matricula?: string;
  telefono?: string;
  carrera?: string;
  direccion?: string;
  imagen?: string;
  correo?: string;
  rol?: string;
}

export const useAuthUser = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          typeof window !== "undefined" ? localStorage.getItem("token") : null;

        if (!token) throw new Error("No token found");

        const decoded: any = jwtDecode(token);

        const response = await axios.get(
          "http://localhost:5270/api/auth/perfil",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      
        setProfile({
          nombreCompleto: response.data.nombreCompleto,
          matricula: response.data.matricula,
          telefono: response.data.telefono,
          direccion: response.data.direccion,
          imagen: response.data.imagen,      
          correo: response.data.correo,
          carrera: response.data.carrera,
          rol: response.data.rol,
        });        

      } catch (err: any) {
        setError(err.message || "Error fetching profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};
