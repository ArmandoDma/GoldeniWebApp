import { useParams, Link } from "react-router";
import { talleres } from "~/data/workshops";
import styles from "../modules/WorkshopsDetails.module.css";
import type { Route } from "../+types/root";
import { IconCalendar, IconChevronLeft } from "@tabler/icons-react";
import { useEvents } from "~/hooks/useEvents";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const WorkshopDetail = () => {
  const { id } = useParams();
  const { events, loading, error } = useEvents();

  const taller = events.find((t) => String(t.id) === id);

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
      <img
        src={taller.imagenEvent}
        alt={taller.nombre}
        className={styles.image}
      />
      <div className={styles.info}>
        <h1>{taller.nombre}</h1>
        <p className={styles.fecha}>
          <IconCalendar size={20} />{" "}
          {new Date(taller.fechaInicio).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
          {" - "}
          {new Date(taller.fechaFin).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p style={{ whiteSpace: "pre-line" }}>{taller.descripcion}</p>
        <Link to="/students/workshops" className={styles.backButton}>
          <IconChevronLeft size={20} /> Volver a talleres
        </Link>
      </div>
    </div>
  );
};

export default WorkshopDetail;
