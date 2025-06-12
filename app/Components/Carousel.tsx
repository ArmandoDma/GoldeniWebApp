import { useEffect, useState } from "react";
import styles from "../modules/Carousel.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router"; 
import { slidesByRoute } from "~/data/slides";

const Carousel = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const slides = slidesByRoute[pathname] || [];

  const [currentSlide, setCurrentSlide] = useState(-1);
  const slideDuration = 5000;

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setCurrentSlide(0);
    }, 100);

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === -1 ? 0 : (prev + 1) % slides.length
      );
    }, slideDuration);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [slides.length]);

  if (slides.length === 0) {
    return <div className={styles.carousel}>No hay slides para esta ruta.</div>;
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.slider}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div className={styles.slide} key={index}>
            <img
              src={slide.image}
              alt={slide.title}
              className={styles.image}
            />
            <div
              className={`${styles.caption} ${
                index === currentSlide ? styles.animateCaption : ""
              }`}
            >
              <span>{slide.tag}</span>
              <h1>{slide.title}</h1>
              <p>{slide.text}</p>
              <Link to="/students/portal">
                Read More{" "}
                <i className="bx bxs-chevron-right">
                  <IconChevronRight size={20} color="#000" />
                </i>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.active : ""
            }`}
          >
            <span
              className={styles.timer}
              style={{ animationDuration: `${slideDuration}ms` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
