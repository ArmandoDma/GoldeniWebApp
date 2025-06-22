import { useEffect, useRef, useState } from "react";
import styles from "../modules/Carousel.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import { Link, useLocation } from "react-router";
import { slidesByRoute } from "~/data/slides";

const Carousel = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const slides = slidesByRoute[pathname as keyof typeof slidesByRoute] || [];

  const [currentSlide, setCurrentSlide] = useState(-1);
  const slideDuration = 5000;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentSlideRef = useRef(currentSlide); // 👈 Mantener el estado sincronizado

  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const startCarousel = () => {
    if (intervalRef.current) return; // evita crear múltiples intervals
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === -1 ? 0 : (prev + 1) % slides.length));
    }, slideDuration);
  };

  const stopCarousel = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setCurrentSlide(0);
      startCarousel(); // ✅ Solo empieza después de mostrar el primer slide
    }, 500);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCarousel();
      } else {
        if (currentSlideRef.current !== -1) {
          startCarousel();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(initialTimeout);
      stopCarousel();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
            <img src={slide.image} alt={slide.title} className={styles.image} />
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
