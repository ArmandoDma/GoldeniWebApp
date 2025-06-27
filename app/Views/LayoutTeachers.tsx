import { IconBellSchool } from "@tabler/icons-react";
import { Aside } from "../Components/Aside";
import { Link, Outlet } from "react-router";
import styles from "../modules/Main.module.css";
import RequireAuth from "../Components/RequireAuth";

const LayoutTeachers = () => {
  return (
    <>
      <RequireAuth>
        <div className={styles.main}>
          <div className={styles.cthdr}>
            <div className={styles.ctnv}>
              <ul className={styles.izlg}>
                <li>
                  <Link to={"/students/portal"}>
                    {" "}
                    <img src="/favicon.svg" alt="logo_site" />{" "}
                    <span>
                      <p className={styles.nm}>GOLDENI</p>
                      <p className={styles.tis}>PRIVATE COLLAGE</p>
                    </span>
                  </Link>
                </li>
              </ul>
              <ul className={styles.drsrch}>
                <li>
                  <input type="text" placeholder="Buscar" />
                </li>
                <li>
                  <Link to="/students/notifications" title="Notificaciones">
                    <i>
                      <IconBellSchool size={24} color="#000" />
                    </i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Aside />
          <main>
            <Outlet />
          </main>
        </div>
      </RequireAuth>
    </>
  );
};

export default LayoutTeachers;
