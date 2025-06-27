import { Link, useLocation } from "react-router";
import styles from "../modules/Main.module.css";
import {
  IconCalendar,
<<<<<<< HEAD
=======
  IconClock24,
>>>>>>> aef1f5b (GoldeniWebApp)
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
<<<<<<< HEAD
  const location = useLocation();  

  const { profile, loading, error } = useAuthUser();

  const isActive = (path: string) => location.pathname === path;

=======
  const location = useLocation();
  const { profile, loading, error } = useAuthUser();

  const rol =
    profile?.rol ||
    (typeof window !== "undefined" ? localStorage.getItem("rol") : null);

  const isMaestro = rol === "3" || rol === "Maestro";
  const isEstudiante = rol === "2" || rol === "Estudiante";

  const isActive = (path: string) => location.pathname === path;
>>>>>>> aef1f5b (GoldeniWebApp)

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
<<<<<<< HEAD
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
=======
          {isEstudiante && (
            <>
              <li className={styles.navItem}>
                <Link
                  to="/students/portal"
                  className={
                    isActive("/students/portal")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconHome size={22} />
                  </i>
                  <span>Inicio</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/courses"
                  className={
                    isActive("/students/courses")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconSchool size={22} />
                  </i>
                  <span>Mis Cursos</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/grades"
                  className={
                    isActive("/students/grades")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconStar size={22} />
                  </i>
                  <span>Calificaciones</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/schedule"
                  className={
                    isActive("/students/schedule")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconClock24 size={22} />
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
                    <IconTools size={22} />
                  </i>
                  <span>Talleres</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/events"
                  className={
                    isActive("/students/events")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconSpeakerphone size={22} />
                  </i>
                  <span>Eventos</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/attend"
                  className={
                    isActive("/students/attend")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconUserCheck size={22} />
                  </i>
                  <span>Asistencia</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to="/students/calendar"
                  className={
                    isActive("/students/calendar")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconCalendar size={22} />
                  </i>
                  <span>Calendario</span>
                </Link>
              </li>
            </>
          )}

          {isMaestro && (
            <>
              <li className={styles.navItem}>
                <Link
                  to="/teachers/portal"
                  className={
                    isActive("/teachers/portal")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconHome size={22} />
                  </i>
                  <span>Inicio</span>
                </Link>
              </li>
              {/* Agrega más enlaces para maestros aquí */}
              <li className={styles.navItem}>
                <Link
                  to="/teachers/groups"
                  className={
                    isActive("/teachers/groups")
                      ? styles.activeLink
                      : styles.link
                  }
                >
                  <i>
                    <IconSchool size={22} />
                  </i>
                  <span>Grupos</span>
                </Link>
              </li>
            </>
          )}
>>>>>>> aef1f5b (GoldeniWebApp)
        </ul>

        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
<<<<<<< HEAD
              to="/students/profile"
              className={
                isActive("/students/profile") ? styles.activeLink : styles.link
              }              
            >
              <img src={profile?.imagen} alt="user_image" />
              <p>                
=======
              to={isEstudiante ? "/students/profile" : "/teachers/profile"}
              className={
                isActive("/students/profile") || isActive("/teachers/profile")
                  ? styles.activeLink
                  : styles.link
              }
            >
              <img src={profile?.imagen} alt="user_image" />
              <p>
>>>>>>> aef1f5b (GoldeniWebApp)
                {loading && "Cargando..."}
                {error && <span style={{ color: "red" }}>{error}</span>}
                {!loading &&
                  !error &&
                  (profile?.nombreCompleto || "Nombre no disponible")}
                <span>
<<<<<<< HEAD
                  <span>{!loading && profile?.rol ? profile.rol : "Rol..."}</span>
                  {error && <span style={{ color: "red" }}>{error}</span>}
=======
                  <span>
                    {!loading && profile?.rol ? profile.rol : "Rol..."}
                  </span>
>>>>>>> aef1f5b (GoldeniWebApp)
                </span>
              </p>
            </Link>
          </li>

          <li className={styles.navItem}>
            <Link
              to="/login"
<<<<<<< HEAD
              className={isActive("/login") ? styles.activeLink : styles.link}
              onClick={() => {localStorage.removeItem("token")}}
            >
              <i>
                <IconLogout size={22} color="#000" />
=======
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
              }}
              className={styles.link}
            >
              <i>
                <IconLogout size={22} />
>>>>>>> aef1f5b (GoldeniWebApp)
              </i>
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
