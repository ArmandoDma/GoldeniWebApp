<<<<<<< HEAD
import { Loader } from "~/Components/Loader";
import type { Route } from "../../+types/root";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const Grades = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />
  return (
    <div>Grades</div>
  )
}

export default Grades;
=======
// src/views/Alumn/Grades.tsx
import { useCalificaciones } from "~/hooks/useCalificaciones";
import type { Route } from "../../+types/root";
import styles from "../../modules/Grades.module.css";

const materias = [
  "Matemáticas",
  "Español",
  "Inglés",
  "Historia",
  "Física",
  "Biología",
  "Química",
  "Geografía",
];

const safeRound = (num: number | undefined): string =>
  typeof num === "number" ? num.toFixed(2) : "-";


const calcularEstado = (nota: number | string) => {
  if (typeof nota === "string") return "-";
  return nota >= 8 ? "Aprobado" : "Reprobado";
};

const Grades = () => {
  const { calificaciones, loading, error } = useCalificaciones();

  if (loading)
    return <div className={styles.centered}>Cargando calificaciones...</div>;
  if (error)
    return <div className={`${styles.centered} ${styles.error}`}>{error}</div>;

  return (
    <div className={styles.gradesCt}>
      <div className={styles.card}>
        <h2 className={styles.title}>Calificaciones del Alumno</h2>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Materia</th>
                <th>Parcial 1</th>
                <th>Parcial 2</th>
                <th>Parcial 3</th>
                <th>Final</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map((item, i) => {
                const promedioNumerico = item.final;
                const promedio = safeRound(promedioNumerico);
                const estado = calcularEstado(promedioNumerico);

                const estadoClass =
                  promedioNumerico >= 8 ? styles.aprobado : styles.reprobado;

                return (
                  <tr key={i} className={styles.row}>
                    <td>{item.materia || `Materia ${i + 1}`}</td>
                    <td className={styles.center}>
                      {safeRound(item.parcial1)}
                    </td>
                    <td className={styles.center}>
                      {safeRound(item.parcial2)}
                    </td>
                    <td className={styles.center}>
                      {safeRound(item.parcial3)}
                    </td>
                    <td className={`${styles.center} ${styles.final}`}>
                      {promedio}
                    </td>
                    <td className={`${styles.center} ${estadoClass}`}>
                      {estado}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Grades;
>>>>>>> aef1f5b (GoldeniWebApp)
