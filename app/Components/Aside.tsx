import { Link, useLocation } from "react-router";
import styles from "../modules/Main.module.css";
import {
  IconCalendar,
  IconClock24,
  IconEyeglass2,
  IconHome,
  IconLogout,
  IconSchool,
  IconSpeakerphone,
  IconStar,
  IconTools,
  IconUserCheck,
} from "@tabler/icons-react";
import { useAuthUser } from "~/hooks/useAuthUsers";
import { ApiAuthLogOut } from "~/data/ApiAuthLogOut";

export const Aside = () => {
  const location = useLocation();
  const { profile, loading, error } = useAuthUser();

  const rol =
    profile?.rol ||
    (typeof window !== "undefined" ? localStorage.getItem("rol") : null);

  const isAdmin = rol === "3" || rol === "Admin";
  const isMaestro = rol === "2" || rol === "Maestro";
  const isEstudiante = rol === "1" || rol === "Estudiante";

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className={styles.aside}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
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
                  <span>Mis Grupos</span>
                </Link>
              </li>

              <li className={styles.navItem}>
                <Link
                  to="/teachers/grades"
                  className={
                    isActive("/teachers/grades")
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
                  to="/teachers/attend"
                  className={
                    isActive("/teachers/attend")
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
            </>
          )}

          {isAdmin && (
            <>
              <li className={styles.navItem}>
                <Link
                  to={"/admin/portal"}
                  className={
                    isActive("/admin/portal") ? styles.activeLink : styles.link
                  }
                >
                  <i>
                    <IconUserCheck size={22} />
                  </i>
                  <span>Inicio</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to={"/admin/register-student"}
                  className={
                    isActive("/admin/register-student") ? styles.activeLink : styles.link
                  }
                >
                  <i>
                    <IconSchool size={22} />
                  </i>
                  <span>Alumnos</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  to={"/admin/register-teacher"}
                  className={
                    isActive("/admin/register-teacher") ? styles.activeLink : styles.link
                  }
                >
                  <i>
                    <IconEyeglass2 size={22} />
                  </i>
                  <span>Maestros</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              to={
                isEstudiante
                  ? "/students/profile"
                  : isMaestro
                  ? "/teachers/profile"
                  : "/admin/profile"
              }
              className={
                isActive("/students/profile") ||
                isActive("/teachers/profile") ||
                isActive("/admin/profile")
                  ? styles.activeLink
                  : styles.link
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
                  <span>
                    {!loading && profile?.rol ? profile.rol : "Rol..."}
                  </span>
                </span>
              </p>
            </Link>
          </li>

          <li className={styles.navItem}>
            <button
              onClick={async () => {
                const sessionId = localStorage.getItem("sessionId");
                const userId = localStorage.getItem("userId");

                if (sessionId && userId) {
                  try {
                    await ApiAuthLogOut(Number(sessionId), Number(userId));
                  } catch (error) {
                    console.error("Error al cerrar sesión:", error);
                  }
                }

                localStorage.removeItem("token");
                localStorage.removeItem("sessionId");
                localStorage.removeItem("userId");
                localStorage.removeItem("rol");
              
                window.location.href = isAdmin ? "/admin/login" : "/login";
              }}
              className={styles.link}
            >
              <i>
                <IconLogout size={22} />
              </i>
              <span>Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
