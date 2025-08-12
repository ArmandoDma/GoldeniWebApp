import styles from "../../modules/TwoStepAuth.module.css";
import { IconArrowLeft, IconKey, IconMail, IconDeviceDesktop } from "@tabler/icons-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

const TStepsAuth = () => {
  const [is2StepEnabled, setIs2StepEnabled] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem("2step_auth");
    setIs2StepEnabled(local === "true");
  }, []);

  const toggle2Step = () => {
    const updated = !is2StepEnabled;
    setIs2StepEnabled(updated);
    localStorage.setItem("2step_auth", String(updated));
  };

  return (
    <section className={styles.twoStepAuth}>
      <header className={styles.header}>
        <Link to="/students/profile" className={styles.back}>
          <IconArrowLeft size={18} />
          Volver al perfil
        </Link>
        <h1>Formas de inicio de sesión</h1>
        <p>Elige cómo deseas proteger tu cuenta al iniciar sesión.</p>
      </header>

      <div className={styles.methodList}>
        <div className={styles.method}>
          <IconKey size={24} />
          <div className={styles.info}>
            <h4>Contraseña</h4>
            <p>Ingresa tu contraseña al iniciar sesión.</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="pass-toggle" checked={true} readOnly />
            <label htmlFor="pass-toggle"></label>
          </div>
        </div>

        <div className={styles.method}>
          <IconMail size={24} />
          <div className={styles.info}>
            <h4>Autenticación en 2 pasos (Correo)</h4>
            <p>Te enviaremos un código de verificación a tu correo cada vez que inicies sesión.</p>
          </div>
          <div className={styles.toggle}>
            <input
              type="checkbox"
              id="two-step-toggle"
              checked={is2StepEnabled}
              onChange={toggle2Step}
            />
            <label htmlFor="two-step-toggle"></label>
          </div>
        </div>

        <div className={styles.method}>
          <IconDeviceDesktop size={24} />
          <div className={styles.info}>
            <h4>Dispositivo de confianza</h4>
            <p>Reconoce este dispositivo como seguro para evitar verificaciones adicionales.</p>
          </div>
          <div className={styles.toggle}>
            <input type="checkbox" id="device-toggle" disabled />
            <label htmlFor="device-toggle"></label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TStepsAuth;
