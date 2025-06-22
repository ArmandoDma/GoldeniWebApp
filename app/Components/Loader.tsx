
import styles from "../modules/Loader.module.css";

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Cargando...</p>
    </div>
  );
};
