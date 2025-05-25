import { Link, useLocation } from "react-router";
import styles from "../modules/Main.module.css";
import {
  IconCalendar,
  IconChevronRight,
  IconHome,
  IconLogout,
  IconSchool,
  IconSpeakerphone,
  IconStar,
  IconTools,
  IconUserCheck,
} from "@tabler/icons-react";

export const Aside = () => {
    const location = useLocation();
    const {username, role} = location.state || {};
    const isActive = (path) => location.pathname === path;

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/students/portal" className={isActive("/students/portal") ? styles.activeLink : styles.link}>
              <i className="bx bx-home-alt">
                <IconHome size={22} color="#000" />
              </i>
              <span>Inicio</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/courses" className={styles.link}>
              <i className="bx bx-book-open">
                <IconSchool size={22} color="#000" />
              </i>
              <span>Mis Cursos</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/grades" className={styles.link}>
              <i className="bx bx-book-open">
                <IconStar size={22} color="#000" />
              </i>
              <span>Calificaciones</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/schedule" className={styles.link}>
              <i className="bx bx-chalkboard">
                <IconCalendar size={22} color="#000" />
              </i>
              <span>Horario</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/workshops" className={styles.link}>
              <i className="bx bx-cog">
                <IconTools size={22} color="#000" />
              </i>
              <span>Talleres</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/events" className={styles.link}>
              <i className="bx bx-cog">
                <IconSpeakerphone size={22} color="#000" />
              </i>
              <span>Eventos</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/students/attend" className={styles.link}>
              <i>
                <IconUserCheck
                  size={22}
                  color="
                #000"
                />
              </i>
              <span>Asistencia</span>
            </Link>
          </li>
        </ul>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link to="/students/profile" className={styles.link}>
              <img src="/armando_cemex.jpg" alt="user_image" />
              <p>{username != null ? username : "Armando Delgadillo"} <span>{role != null ? role : "Estudiante"}</span></p>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/login" className={styles.link}>
            <i><IconLogout size={22} color="#000" /></i>
            <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
