import styles from "../../modules/Attend.module.css";
import type { Route } from "../../+types/root";
import { IconFilter } from "@tabler/icons-react";
import { asistencias } from "~/data/attend";
import { useEffect, useState } from "react";
import { Loader } from "~/Components/Loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const Attend = () => {
  const getBadgeClass = (estado: any) => {
    switch (estado.toLowerCase()) {
      case "presente":
        return styles.presente;
      case "ausente":
        return styles.ausente;
      case "tarde":
        return styles.retardo;
      case "justificada":
        return styles.justificada;
      default:
        return "";
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false)
  }, [])

  if(loading) return <Loader />

  return (
    <>
      <div className={styles.ctAttend}>
        <div className={styles.flterRow}>
          <h2>Filtrar por:</h2>
          <div className={styles.rw}>
            <p>Fecha</p>
            <input type="date" placeholder="" />
          </div>
          <div className={styles.rw}>
            <p>Estado</p>
            <select name="" id="">
              <option value="">Presente</option>
              <option value="">Justificada</option>
              <option value="">Ausente</option>
            </select>
          </div>
          <div className={styles.rw}>
            <p>Asignatura</p>
            <select name="" id="">
              <option value="">Administración Del Tiempo</option>
              <option value="">Inglés VII</option>
            </select>
          </div>
          <div className={styles.rw}>
            <p>btn</p>
            <button type="submit">
              Filtrar <IconFilter size={16} />
            </button>
          </div>
        </div>
        <table className={styles.tblAttends}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Asignatura</th>
              <th>Docente</th>
              <th>Estado Asistencia</th>
            </tr>
          </thead>
          <tbody>
            {asistencias.map((asis) => (
              <tr key={asis.id}>
                <td>{asis.id}</td>
                <td>{asis.fecha}</td>
                <td>{asis.asignatura}</td>
                <td className={styles.profesor}>
                  <div className={styles.avatarContainer}>
                    <img
                      alt={asis.docente}
                      src={asis.fotoDoc}
                      className={styles.avatar}
                      title={asis.docente}
                    />
                  </div>
                </td>
                <td>
                  <span className={`${styles.badge} ${getBadgeClass(asis.estado)}`}>
                    {asis.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Attend;
