import { useGetMaterias } from "~/hooks/useGetMaterias"; // ajusta ruta si es necesario
import { Loader } from "~/Components/Loader";
import styles from "../../modules/Courses.module.css";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const Courses = () => {
  const { materias, loading, error } = useGetMaterias();

  if (loading) return <Loader />;
  if (error)
    return <p>Error al cargar materias: {error.message || error.toString()}</p>; 

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materias Actuales</h1>
      <div className={styles.grid}>
        {materias.map((materia) => {          
          return (
            <div key={materia.idMateria} className={styles.card}>
              <img
                src={materia.imageMat}
                alt={materia.nombreMateria}
                className={styles.cardImage}
              />
              <div className={styles.cardBody}>
                <p className={styles.courseTitle}>{materia.nombreMateria}</p>
                <p className={styles.teacher}>Maestro: {materia.maestro}</p>
                <div className={styles.details}>
                  <span>Alumnos: {materia.alumnos.length}</span>
                </div>
                <div className={styles.footer}>                  
                  <span>
                    <strong>ID:</strong> {materia.idMateria}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
