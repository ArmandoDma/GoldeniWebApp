import { useNavigate } from "react-router";
import styles from "../modules/LoginForm.module.css";
import { useState } from "react";
import { ApiAuthLogin } from "~/data/ApiAuthLogin";

export const LoginForm = () => {
  const nav = useNavigate();
  const [role, setRole] = useState("Estudiante");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendToPortal(e: React.FormEvent) {
    e.preventDefault();

    const rolMap: Record<string, number> = {
      Estudiante: 1,
      Maestro: 2,
    };

    const IdRol = rolMap[role] ?? "";

    ApiAuthLogin({
      email: username,
      password,
      IdRol,
    })
      .then(() => {
        const path = IdRol === 1 ? "/students/portal" : "/teachers/portal";
        localStorage.setItem("rol", IdRol.toString())
        nav(path, { replace: true, state: { username, role } });
      })
      .catch((error) => {
        const path = "/login"
        setPassword("");
        setUsername("");
        nav(path, {replace: true, state: {}})
      });
  }
  return (
    <>
      <div className={styles.hdrMn}>
        <div className={styles.hdrform}>
          <form onSubmit={sendToPortal}>
            <div className={styles.formlg}>
              <div className={styles.cnt}>
                <img src="/favicon.svg" alt="" />
                <span>
                  <p>MY GOLDENI</p>
                  <p>Web Application</p>
                </span>
              </div>
            </div>
            <input
              id="usr"
              type="email"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              id="usrpss"
              type="password"
              placeholder="Password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize="off"
              aria-label="Password"
              aria-required="true"
            />
            <input id="submit" type="submit" value="Sign In" role="button" />
            <div className={styles.frgtlinks}>
              <a href="#forgot-password">forgot your password?</a>
              <p>
                <strong>Note :</strong> if you're GOLDENI administrator, you
                should enter since <a href="#link-teacher">GOLDENI Admins.</a>
              </p>
            </div>
            <hr style={{ border: "1px solid #eee" }} />
            <div className={styles.rcntusr}>
              <h5>Account type :</h5>
              <div className={styles.comUsr}>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  name="slct"
                  id="slct"
                >
                  {["Estudiante", "Maestro"].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
