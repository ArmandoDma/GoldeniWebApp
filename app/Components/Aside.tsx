import { Link, useLocation } from "react-router";
import styles from "../modules/Main.module.css";
import {
  IconCalendar,
  IconHome,
  IconLogout,
  IconSchool,
  IconSpeakerphone,
  IconStar,
  IconTools,
  IconUserCheck,
} from "@tabler/icons-react";
import { useAuthUser } from "~/hooks/useAuthUsers";
import { useEffect, useState } from "react";

export const Aside = () => {
  const location = useLocation();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const { profile, loading, error } = useAuthUser();

  const isActive = (path: string) => location.pathname === path;

  if (!token) {
    return (
      <aside className={styles.aside}>
        <nav className={styles.nav}>
          <p>Por favor inicia sesión</p>
        </nav>
      </aside>
    );
  }

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/students/portal"
              className={
                isActive("/students/portal") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconHome size={22} color="#000" />
              </i>
              <span>Inicio</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/courses"
              className={
                isActive("/students/courses") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconSchool size={22} color="#000" />
              </i>
              <span>Mis Cursos</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/grades"
              className={
                isActive("/students/grades") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconStar size={22} color="#000" />
              </i>
              <span>Calificaciones</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/schedule"
              className={
                isActive("/students/schedule") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconCalendar size={22} color="#000" />
              </i>
              <span>Horario</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/workshops"
              className={
                isActive("/students/workshops")
                  ? styles.activeLink
                  : styles.link
              }
            >
              <i>
                <IconTools size={22} color="#000" />
              </i>
              <span>Talleres</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/events"
              className={
                isActive("/students/events") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconSpeakerphone size={22} color="#000" />
              </i>
              <span>Eventos</span>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              to="/students/attend"
              className={
                isActive("/students/attend") ? styles.activeLink : styles.link
              }
            >
              <i>
                <IconUserCheck size={22} color="#000" />
              </i>
              <span>Asistencia</span>
            </Link>
          </li>
        </ul>

        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to="/students/profile"
              className={
                isActive("/students/profile") ? styles.activeLink : styles.link
              }
            >
              <img src={profile?.imagen} alt="user_image" />
              <p>                
                {loading && "Cargando..."}
                {error && <span style={{ color: "red" }}>{error}</span>}
                {!loading &&
                  !error &&
                  (profile?.nombreCompleto || "Nombre no disponible")}
                <span>
                  <span>{!loading && profile?.rol ? profile.rol : "Rol..."}</span>
                  {error && <span style={{ color: "red" }}>{error}</span>}
                </span>
              </p>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              to="/login"
              className={isActive("/login") ? styles.activeLink : styles.link}
            >
              <i>
                <IconLogout size={22} color="#000" />
              </i>
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
