import Carousel from "~/Components/Carousel";
import styles from "../modules/Events.module.css";

const Eventos = () => {
  return (
    <>
    <div className={styles.ctevents}>
      <Carousel />
      <div className="txt-secc">
        <h1>Eventos</h1>
      </div>
    </div>
    </>
  )
}

export default Eventos;