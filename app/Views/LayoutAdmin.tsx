import { Outlet } from "react-router";
import styles from "../modules/Main.module.css";
import { Link } from "react-router";
import { IconBellSchool } from "@tabler/icons-react";
import { Aside } from "~/Components/Aside";
import RequireAuth from "~/Components/RequireAuth";

export default function LayoutAdmin() {
  return (
    <>
    <RequireAuth allowedRoles={["3"]}>      
      <div className={styles.main}>
        <div className={styles.cthdr}>
          <div className={styles.ctnv}>
            <ul className={styles.izlg}>
              <li>
                <Link to={"/admin/portal"}>
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
                <Link to="/admin/notifications" title="Notificaciones">
                  <i>
                    <IconBellSchool size={24} color="#000" />
                  </i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Aside />
        <main className={styles.root}>
          <Outlet />
        </main>
      </div>
    </RequireAuth>
    </>
  );
}
