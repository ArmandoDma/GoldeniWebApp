import Carousel from "~/Components/Carousel";
import styles from "../../modules/Events.module.css";
import type { Route } from "../../+types/root";
import CardEvent from "~/Components/CardEvent";
import { Outlet, replace, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Loader } from "~/Components/Loader";
import { useEvents } from "~/hooks/useEvents";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const Eventos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { events, loading, error } = useEvents("Evento");
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>("");
  const [lugarFiltro, setLugarFiltro] = useState<string>("");
  const [fechaFiltro, setFechaFiltro] = useState<string>("");

  const categorias = Array.from(new Set(events.map((e) => e.categoria)));
  const lugares = Array.from(new Set(events.map((e) => e.lugar)));
  const fechas = Array.from(new Set(events.map((e) => e.fechaInicio)));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.get("tipo")) {
      params.set("tipo", "Evento");
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  const eventosFiltrados = events.filter((e) => {
    const fechaEvento = e.fechaInicio.split("T")[0]; // solo la parte YYYY-MM-DD
    return (
      (categoriaFiltro === "" || e.categoria === categoriaFiltro) &&
      (lugarFiltro === "" || e.lugar === lugarFiltro) &&
      (fechaFiltro === "" || fechaEvento === fechaFiltro)
    );
  });

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={styles.ctevents}>
        <Carousel />

        <div className={styles.flterBox}>
          <div className={styles.ctBox}>
            <h4>Filtrar por categoria:</h4>
            <select
              name="categoria"
              id="categoria"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ctBox}>
            <h4>Lugar: </h4>
            <select
              name="lugar"
              id="lugar"
              value={lugarFiltro}
              onChange={(e) => setLugarFiltro(e.target.value)}
            >
              <option value="">Todos los lugares</option>
              {lugares.map((lug) => (
                <option key={lug} value={lug}>
                  {lug}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.ctBox}>
            <h4>Fecha: </h4>
            <input
              type="date"
              name="fecha"
              id="fecha"
              value={fechaFiltro}
              onChange={(e) => setFechaFiltro(e.target.value)}
            />
          </div>
        </div>
        {eventosFiltrados.map((event:any) => (
          <CardEvent key={event.nombre} data={event} />
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Eventos;
