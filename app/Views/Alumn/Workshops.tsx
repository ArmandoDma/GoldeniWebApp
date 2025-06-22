import { useEffect, useState } from "react";
import type { Route } from "../../+types/root";
import { talleres } from "~/data/workshops";
import { Link } from "react-router";
import styles from "../../modules/Workshops.module.css"; // Importación del CSS Module
import Carousel from "~/Components/Carousel";
import { IconPointFilled } from "@tabler/icons-react";
import { Loader } from "~/Components/Loader";


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

  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />

  return (
    <>
      <div className={styles.ctWorks}>     
        
        <Carousel />        

        <div className={styles.ticker}>
          <div className={styles["ticker-content"]}>
            {avisos.map((aviso, idx) => (
              <span key={idx}>{aviso} <IconPointFilled size={20} /></span>
            ))}
          </div>
        </div>
      
        <header className={styles.titulo}>
          <h1>Talleres</h1>
          <p>Participa en actividades prácticas este semestre.</p>
        </header>
        
        <section className={styles.grid}>
          {talleres.map((taller, index) => (
            <div className={styles.card} key={index}>
              <img src={taller.imagen} alt={taller.titulo} />
              <div className={styles["card-info"]}>
                <span className={styles.fecha}>{taller.fecha}</span>
                <h3>{taller.titulo}</h3>
                <p>{taller.descripcion}</p>
                <Link to={taller.ruta}>
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
