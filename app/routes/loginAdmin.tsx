import Authenticated from "~/Components/Authenticated";
import styles from "../modules/LayoutAdmin.module.css";
import type { Route } from "../+types/root";
import { LoginAdmins } from "~/Components/LoginAdminForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const LoginAdmin = () => {
  return (
    <>
      <Authenticated>
        <header id="hdr" className={styles.header}>
          <div className={styles.coHdr}>
            <nav className={styles.nHdr}>
              <ul className={styles.iz}>
                <li>
                  <a href="index.html">
                    <img src="/favicon.svg" alt="" />
                    <span>
                      <p>GOLDENI</p>
                      <p>Private College</p>
                    </span>
                  </a>
                </li>
              </ul>
              <ul className={styles.dr}>
                <li>
                  <span>
                    <button>ES</button>|<button>EN</button>
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <LoginAdmins />
      </Authenticated>
    </>
  );
};


export default LoginAdmin;