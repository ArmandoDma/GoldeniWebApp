import { IconAwardFilled, IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandWhatsapp, IconBrandWindows, IconBriefcase, IconChevronLeft, IconCloudFilled, IconDeviceDesktop, IconDevices, IconKey, IconMail, IconUser } from "@tabler/icons-react";
import styles from "../../modules/Profile.module.css";
import { Link } from "react-router";

const Profile = () => {
  return (
    <>
      <article id="accounts" className={styles.accounts}>
        <div className={styles.hdracc}>
          <Link
            to="/students/portal"
            id="bcksecc"
            title="Back"
            className={styles.bckscc}
            role="button"
            type="button"
          >
            <i className="bx bx-chevron-left"><IconChevronLeft size={22} color="#fff" /></i>
          </Link>
          <h1>Perfil</h1>
        </div>
        <div className={styles.mnacc}>
          <div className={styles.itacc}>
            <h3>Detalles del usuario:</h3>
            <div className={styles.dtls}>
              <div className={styles["dtls-img"]}>
                <img src="/armando_cemex.jpg" id="acc-img" alt="acc-user" />
              </div>
              <div className={styles["cap-acc"]}>
                <h2>Armando Delgadillo Mijangos</h2>
                <p id="rol">Estudiante</p>
                <a href="mailto:armandoguapo@example.com" id="acc-mail">
                  armandoguapo@example.com
                </a>
              </div>
            </div>
            <div className={styles.social}>
              <h3>Carrera: </h3>
              <p>Ing. Desarrollo de Software Multiplataforma</p>
            </div>
            <div className={styles.social}>
              <h3>Actividad reciente: </h3>
              <button role="button" type="button">
                <span>
                  <i className="bx bx-time"></i>
                </span>
                <div className={styles.rctact}>
                  <p>Ultimo inicio de sesión:</p>
                  <p id="date">20/08/2022 8:38 pm</p>
                </div>
                <span>
                  <i className="bx bxs-chevron-right"></i>
                </span>
              </button>
            </div>
            <div className={styles.social}>
              <h3>Contacto:</h3>
              <a href="#linkedin">
                <i className="bx bxl-linkedin"><IconBrandLinkedin size={20} color="#000" /></i>
              </a>
              <a href="#instagram">
                <i className="bx bxl-instagram"><IconBrandInstagram size={20} color="#000" /></i>
              </a>
              <a href="#facebook">
                <i className="bx bxl-facebook-circle"><IconBrandFacebook size={20} color="#000" /></i>
              </a>
              <a href="#whatsapp">
                <i className="bx bxl-whatsapp"><IconBrandWhatsapp size={20} color="#000" /></i>
              </a>
            </div>
          </div>

          <div className={styles.itacc}>
            <h3>Cuentas: </h3>
            <div className={styles.dtls}>
              <button role="button" type="button">
                <span>
                  <i className="bx bxl-microsoft"><IconBrandWindows size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Tu cuenta de Microsoft</p>
                  <p>Apps, Recompensas, Subs & Más.</p>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.itacc}>
            <h3>Tú información: </h3>
            <div className={styles.dtls}>
              <button role="button" type="button">
                <span>
                  <i className="bx bxs-user-detail"><IconUser size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Información de la cuenta</p>
                  <p>Calendario, Contactos & Más.</p>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.itacc}>
            <h3>Opciones de inicio de sesión: </h3>
            <div className={styles.dtls}>
              <button role="button" type="button">
                <span>
                  <i className="bx bxs-key"><IconKey size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Formas de inicio de sesión</p>
                  <p>Contraseña, PIN & QR.</p>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.itacc}>
            <h3>Más opciones:</h3>
            <div className={styles["dtls-mo"]}>
              <button role="button" type="button">
                <span>
                  <i className="bx bx-devices"><IconDevices size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Otros dispositivos conectados</p>
                  <p>Mira los dispositivos que estan conectados a tu cuenta.</p>
                </div>
              </button>
              <button role="button" type="button">
                <span>
                  <i className="bx bx-envelope"><IconMail size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Cuentas y Email</p>
                  <p>Cuentas provenientes del correo, calendario y contactos.</p>
                </div>
              </button>
              <button role="button" type="button">
                <span>
                  <i className="bx bx-desktop"><IconDeviceDesktop size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Copia de seguridad de windows</p>
                  <p>
                    Haz una copia segura de tus archivos, apps y preferencias de recuperación.
                  </p>
                </div>
              </button>
              <button role="button" type="button">
                <span>
                  <i className="bx bx-briefcase-alt"><IconBriefcase size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Obten acceso a tu trabajo o escuela</p>
                  <p>Recursos empresariales como email, apps y red.</p>
                </div>
              </button>
            </div>
          </div>

          <div className={styles.itacc}>
            <h3>Otros:</h3>
            <div className={styles.dtls}>
              <button role="button" type="button">
                <span>
                  <i className="bx bxs-award"><IconAwardFilled size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>Recompensas</p>
                  <p>200 pts</p>
                </div>
              </button>
              <button role="button" type="button">
                <span>
                  <i className="bx bxs-cloud"><IconCloudFilled size={20} color="#000" /></i>
                </span>
                <div className={styles.subcap}>
                  <p>One Drive</p>
                  <p>Sign In</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default Profile;
