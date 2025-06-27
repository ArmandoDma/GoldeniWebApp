import { LoginForm } from "~/Components/LoginForm";
import type { Route } from "./+types/home";
<<<<<<< HEAD
import styles from "../modules/Layout.module.css"

=======
import styles from "../modules/Layout.module.css";
import Authenticated from "~/Components/Authenticated";
>>>>>>> aef1f5b (GoldeniWebApp)

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
<<<<<<< HEAD
    { name: "description", content: "" },   
  ];
}

export default function Login (){
  return (
    <>    
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
      <LoginForm />
=======
    { name: "description", content: "" },
  ];
}

export default function Login() {
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
        <LoginForm />
      </Authenticated>
>>>>>>> aef1f5b (GoldeniWebApp)
    </>
  );
}
