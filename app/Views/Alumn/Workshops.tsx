import { useEffect, useState } from "react";
import type { Route } from "../../+types/root";
import { talleres } from "~/data/workshops";
import { Link, useLocation, useNavigate } from "react-router";
import styles from "../../modules/Workshops.module.css"; // Importación del CSS Module
import Carousel from "~/Components/Carousel";
import { IconPointFilled } from "@tabler/icons-react";
import { Loader } from "~/Components/Loader";
import { useEvents } from "~/hooks/useEvents";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const avisos = [
  "¡Inscripciones abiertas hasta el 10 de julio!",
  "Cupo limitado en el Taller de Robótica.",
  "Taller de Aplicaciones incluye certificado oficial.",
];

const Workshops = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { events, loading, error } = useEvents("Taller");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("tipo")) {
      params.set("tipo", "Taller");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.ctWorks}>
        <Carousel />

        <div className={styles.ticker}>
          <div className={styles["ticker-content"]}>
            {avisos.map((aviso, idx) => (
              <span key={idx}>
                {aviso} <IconPointFilled size={20} />
              </span>
            ))}
          </div>
        </div>

        <header className={styles.titulo}>
          <h1>Talleres</h1>
          <p>Participa en actividades prácticas este semestre.</p>
        </header>

        <section className={styles.grid}>
          {events.map((taller) => (
            <div className={styles.card} key={taller.id}>
              <img src={taller.imagenEvent} alt={taller.nombre} />
              <div className={styles["card-info"]}>
                <span className={styles.fecha}>
                  {new Date(taller.fechaInicio).toLocaleDateString("es-MX", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <h3>{taller.nombre}</h3>
                <p>{taller.descripcion.split(" ").slice(0, 22).join(" ") + "..."}</p>
                <Link to={`/students/workshops/${taller.id}`}>
                  <button>Más info</button>
                </Link>
              </div>
            </div>
          ))}
        </section>
      </div>
    </>
  );
};

export default Workshops;
