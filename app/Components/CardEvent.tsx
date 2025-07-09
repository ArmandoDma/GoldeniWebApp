import { useRef } from "react";
import styles from "../modules/Events.module.css";
import {
  IconChevronLeft,
  IconChevronRight,
  IconHeart,
  IconTicket,
  IconUpload,
} from "@tabler/icons-react";
import { Loader } from "./Loader";
import { useEvents } from "~/hooks/useEvents";

const CardEvent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { events, loading, error } = useEvents("Evento");

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollRef.current.clientWidth;
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= scrollRef.current.clientWidth;
    }
  };

  return (
    <div className={styles.ctCard}>
      <div className={styles.controls}>
        <div>
          <h2>Próximos Eventos</h2>
        </div>
        <div>
          <button onClick={() => scrollLeft()}>
            <IconChevronLeft size={16} />
          </button>
          <button onClick={() => scrollRight()}>
            <IconChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className={styles.ctCBox} ref={scrollRef}>
        {events.map((evento, i) => (
          <div className={styles.card} key={i}>
            <div className={styles.imageContainer}>
              <img src={evento.imagenEvent} alt={evento.nombre} />
              <span className={styles.price}>
                <IconTicket size={20} /> {evento.precio.toLocaleString("es-MX", {style: "currency", currency: "MXN"})}
              </span>
              <div className={styles.actions}>
                <button title="Guardar">
                  <IconUpload size={20} color="#000" />
                </button>
                <button title="Me gusta">
                  <IconHeart stroke={2} size={20} color="#ff0000" />
                </button>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.dateBox}>
                <span className={styles.day}>
                  {new Date(evento.fechaInicio).getDate()}
                </span>
                <span className={styles.month}>
                  {new Date(evento.fechaInicio)
                    .toLocaleString("es-ES", { month: "short" })
                    .toUpperCase()}
                </span>
              </div>
              <div className={styles.details}>
                <h3>{evento.nombre}</h3>
                <p>{evento.lugar}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardEvent;
