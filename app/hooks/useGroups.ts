
import { useEffect, useState } from "react";
import ApiClient from "./ApiClient";


export interface Alumno {
  idAlumno: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface Grupo {
  idGrupo: number;
  nombreGrupo: string;
  fechaCreacion: string;
  alumnos: Alumno[];
}

export const useGroups = () => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ApiClient.get("/Maestro/grupos")
      .then((response) => {
        setGrupos(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al obtener los grupos");
        setLoading(false);
      });
  }, []);

  return { grupos, loading, error };
};
