import { useRef } from "react";
import { eventosEscolares } from "~/data/events";
import styles from "../modules/Events.module.css";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const CardEvent = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
        {eventosEscolares.map((evento) => (
          <div className={styles.card} key={evento.id}>
            <div className={styles.imageContainer}>
              <img src={evento.imagen} alt={evento.nombre} />
              <span className={styles.price}>🎟️ Gratis</span>
              <div className={styles.actions}>
                <button title="Guardar">🔗</button>
                <button title="Me gusta">❤️</button>
              </div>
            </div>

            <div className={styles.content}>
              <div className={styles.dateBox}>
                <span className={styles.day}>
                  {new Date(evento.fecha).getDate()}
                </span>
                <span className={styles.month}>
                  {new Date(evento.fecha)
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
