import { useNavigate } from "react-router"
import styles from "../modules/LoginForm.module.css"
import { Data } from "~/data/users";
import { useState } from "react";

export const LoginForm = () => {
  const nav = useNavigate();
  const data = Data();
  
  const roles = data.map((person) => person.rol || person.role);
  const uniqueRoles = [...new Set(roles)];
  const [role, setRole] = useState(uniqueRoles[0] || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function sendToPortal(e:any){
    e.preventDefault();
    if(role == "Estudiante"){
      nav(`/students/portal`, {replace: true, state:{username, role}})
      console.log(username + " " + password)
    }else{
      nav(`/teachers/portal`, {replace: true})
      console.log(username + " " + password)
    }
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
            <input id="usr" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
            <input
              id="submit"
              type="submit"
              value="Sign In"
              role="button"
              aria-hidden="true"
            />
            <div className={styles.frgtlinks}>
              <a href="#forgot-password">forgot your password?</a>
              <p>
                <strong>Note :</strong> if you're GOLDENI administrator, you should
                enter since{' '}
                <a href="#link-teacher">GOLDENI Admins.</a>
              </p>
            </div>
            <hr style={{ border: '1px solid #eee' }} />
            <div className={styles.rcntusr}>
              <h5>Account type :</h5>
              <div className={styles.comUsr}>
                <select value={role} onChange={(e) => setRole(e.target.value)} name="slct" id="slct">
                  {
                    uniqueRoles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
