import { useParams, Link } from "react-router";
import { talleres } from "~/data/workshops";
import styles from "../modules/WorkshopsDetails.module.css";
import type { Route } from "../+types/root";
import { IconCalendar, IconChevronLeft } from "@tabler/icons-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const WorkshopDetail = () => {
  const { id } = useParams();

  const taller = talleres.find((t) =>
    t.ruta.endsWith(`/students/workshops/${id}`)
  );

  if (!taller) {
    return (
      <div className={styles.notFound}>
        <h2>Taller no encontrado</h2>
        <Link to="/students/workshops">← Volver a talleres</Link>
      </div>
    );
  }

  return (
    <div className={styles.detail}>
      <img src={taller.imagen} alt={taller.titulo} className={styles.image} />
      <div className={styles.info}>
        <h1>{taller.titulo}</h1>
        <p className={styles.fecha}><IconCalendar size={20} /> {taller.fecha}</p>
        {/* Aquí respetamos saltos de línea en desc2 */}
        <p style={{ whiteSpace: "pre-line" }}>{taller.desc2}</p>
        <Link to="/students/workshops" className={styles.backButton}>
          <IconChevronLeft size={20} /> Volver a talleres
        </Link>
      </div>
    </div>
  );
};

export default WorkshopDetail;
