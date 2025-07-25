import { useNavigate } from "react-router";
import styles from "../modules/LoginAdminForm.module.css"
import { useState } from "react";
import { ApiAuthLogin } from "~/data/ApiAuthLogin";

export const LoginAdmins = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();

    const IdRol = 3;

    ApiAuthLogin({
      email: username,
      password,
      IdRol,
    })
      .then(() => {
        localStorage.setItem("rol", IdRol.toString());
        nav("/admin/portal", {
          replace: true,
          state: { username, role: "Admin" },
        });
      })
      .catch(() => {
        setUsername("");
        setPassword("");
        nav("/admin/login", { replace: true });
      });
  }

  return (
    <div className={styles.hdrMn}>
      <div className={styles.hdrform}>
        <form onSubmit={handleAdminLogin}>
          <div className={styles.formlg}>
            <div className={styles.cnt}>
              <img src="/favicon.svg" alt="Logo" />
              <span>
                <p>MY GOLDENI</p>
                <p>Admin Access</p>
              </span>
            </div>
          </div>

          <input
            id="usr"
            type="email"
            placeholder="Correo institucional"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="usrpss"
            type="password"
            placeholder="Contraseña"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoCapitalize="off"
            aria-label="Password"
            aria-required="true"
          />
          <input id="submit" type="submit" value="Ingresar como Admin" role="button" />

          <div className={styles.frgtlinks}>
            <a href="#forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
      </div>
    </div>
  );
}