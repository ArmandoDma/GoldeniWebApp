import { useEffect, useState } from 'react';
import axios from 'axios';

interface Alumno {
  idAlumno: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

interface Materia {
  idMateria: number;
  nombreMateria: string;
  maestro: string;
  imageMat: string;
  alumnos: Alumno[];
}

export function useGetMaterias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axios.get<Materia[]>('http://localhost:5270/api/CoursesAlumno/materias', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setMaterias(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, []);

  return { materias, loading, error };
}
