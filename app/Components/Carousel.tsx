import { useEffect, useState } from "react";
import styles from "../modules/Carousel.module.css";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router";

const slides = [
  {
    image: "/armando_cemex.jpg",
    title: "Campus Monterrey",
    text: "Explora nuestras instalaciones de primer nivel.",
    tag: "News",
  },
  {
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coffee Shop",
    text: "Disfruta de un café mientras estudias o te relajas.",
    tag: "Social",
  },
  {
    image: "https://plus.unsplash.com/premium_photo-1703701579660-8481915a7991?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Library #1",
    text: "La mejor biblioteca del mundo a tu disposición.",
    tag: "Students",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const slideDuration = 5000; 

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setCurrentSlide(0);
    }, 100); 

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === -1 ? 0 : (prev + 1) % slides.length));
    }, slideDuration);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

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
              <Link to="/">
                Read More <i className="bx bxs-chevron-right"><IconChevronRight size={20} color="#000" /></i>
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
