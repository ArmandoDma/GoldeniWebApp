import Carousel from "~/Components/Carousel";
import styles from "../../modules/Events.module.css";
import type { Route } from "../../+types/root";
import CardEvent from "~/Components/CardEvent";
import { Outlet } from 'react-router';
import { useEffect, useState } from "react";
import { Loader } from "~/Components/Loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const Eventos = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />
  return (
    <>
      <div className={styles.ctevents}>
        <Carousel />

        <div className={styles.flterBox}>
          <div className={styles.ctBox}>
            <h4>Filtrar por categoria:</h4>
            <select name="" id="">
              <option value="International">International</option>
            </select>
          </div>
          <div className={styles.ctBox}>
            <h4>Lugar: </h4>
            <select name="" id="">
              <option value="Monterrey N.L">Monterrey N.L</option>
            </select>
          </div>
          <div className={styles.ctBox}>
            <h4>Fecha: </h4>
            <input
              type="date"
              name="fecha"
              id="fecha"
            />
          </div>
        </div>

        <CardEvent />
      </div>
      <Outlet />
    </>
  );
};

export default Eventos;
