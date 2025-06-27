import { useEffect, useState } from "react";
import type { Route } from "../../+types/root";
import { Loader } from "~/Components/Loader";
<<<<<<< HEAD
=======
import { courses } from "~/data/courses";
import styles from "../../modules/Courses.module.css";

>>>>>>> aef1f5b (GoldeniWebApp)

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

<<<<<<< HEAD
const Courses = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />
  return (
    <div>Courses</div>
  )
}

=======

const Courses = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Materias Actuales</h1>
      <div className={styles.grid}>
        {courses.map((course, i) => (
          <div key={i} className={styles.card}>
            <img
              src={course.image}
              alt={course.title}
              className={styles.cardImage}
            />
            <div className={styles.cardBody}>
              <p className={styles.courseTitle}>{course.title}</p>
              <p className={styles.teacher}>Por {course.teacher}</p>

              <div className={styles.details}>
                <span>Lecciones: {course.lessons}</span>
                <span>Tareas: {course.assignments}</span>
              </div>
              <div className={styles.details}>
                <span>Último score: {course.lastScore}</span>
                <span>Tiempo: {course.time}</span>
              </div>

              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  style={{ width: `${course.progress}%` }}
                />
              </div>

              <div className={styles.footer}>
                <span><strong>GPA:</strong> {course.gpa}</span>
                <span>{course.progress}% completado</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
>>>>>>> aef1f5b (GoldeniWebApp)

export default Courses;