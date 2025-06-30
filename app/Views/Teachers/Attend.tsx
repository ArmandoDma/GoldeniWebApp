import { useTokenGenerator } from "~/hooks/useTokenGenerator";
import type { Route } from "../../+types/root";
import { useEffect, useState } from "react";
import styles from "../../modules/AttendT.module.css";
import { QRCode } from "react-qrcode-logo";
import { useAuthUser } from "~/hooks/useAuthUsers";
import { Link, Outlet } from "react-router";
import { IconChevronDown } from "@tabler/icons-react";
import axios from "axios";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const Attend = () => {
  const { tokenInfo, error, generarToken } = useTokenGenerator();
  const { loading, profile } = useAuthUser();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  useEffect(() => {
    if (profile && profile.matricula) {
      generarToken(profile.matricula);
    }
  }, [profile]);

  useEffect(() => {
    if (!tokenInfo) {
      setTimeLeft(null);
      return;
    }

    const expiresAt = new Date(tokenInfo.expiresAt).getTime();
    setIsTokenExpired(false);

    let hasDeactivated = false; // Flag local para este ciclo

    const interval = setInterval(async () => {
      const now = new Date().getTime();
      const secondsLeft = Math.max(Math.floor((expiresAt - now) / 1000), 0);
      setTimeLeft(secondsLeft);

      if (secondsLeft <= 0 && !hasDeactivated) {
        clearInterval(interval);
        setIsTokenExpired(true);

        try {
          await axios.post(
            "http://localhost:5270/api/AsistenciaToken/desactivar",
            { token: tokenInfo.token },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          hasDeactivated = true;
        } catch (error: any) {
          if (error.response?.status === 404) {
            console.debug("Token ya estaba inactivo.");
          } else {
            console.debug("Error al desactivar token:", error);
          }
        }

        if (profile?.matricula) {
          generarToken(profile.matricula).then((success) => {
            if (success) {
              setIsTokenExpired(false);
            }
          });
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);

      if (tokenInfo?.token && !hasDeactivated && !isTokenExpired) {
        axios
          .post(
            "http://localhost:5270/api/AsistenciaToken/desactivar",
            { token: tokenInfo.token },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            console.debug("Token desactivado al desmontar");
            hasDeactivated = true;
          })
          .catch((error: any) => {
            if (error.response?.status === 404) {
              console.debug("Token ya estaba inactivo al desmontar.");
            } else {
              console.debug("Error al desactivar token al desmontar:", error);
            }
          });
      }
    };
  }, [tokenInfo, profile]);

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "--:--";

    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    const paddedMin = min.toString().padStart(2, "0");
    const paddedSec = sec.toString().padStart(2, "0");

    return `${paddedMin}:${paddedSec}`;
  };

  return (
    <>
      <div className={styles.ctAtt}>
        <div className={styles.Tattend}>
          <div className={styles.dwnldApp}>
            <div className={styles.cap}>
              <h3>
                ¿Aún no tienes la app <span>Goldeni</span>?
              </h3>
              <p>
                Descárgala ahora y lleva el control de tu asistencia de forma
                rápida y segura.
                <br />
                Escanea el código QR y entra sin complicaciones.
              </p>
            </div>
            <Link to={""}>
              Descargar <IconChevronDown size={20} />
            </Link>
          </div>
          <div className={styles.ctQR}>
            <div className={styles.steps}>
              <h1>Registra tu asistencia</h1>
              <div className={styles.stItems}>
                <ol>
                  <li>
                    Abre tu cámara: Pulsa el botón 'Escanear QR' para abrir el
                    lector.
                  </li>
                  <li>
                    Apunta al código: Coloca tu teléfono frente al QR mostrado
                    por tu maestro.
                  </li>
                  <li>
                    Confirma: Espera unos segundos para que se registre tu
                    asistencia automáticamente.
                  </li>
                  <li>
                    Verifica: Revisa el mensaje de éxito y asegúrate de recibir
                    la confirmación.
                  </li>
                </ol>
              </div>
            </div>
            <div className={styles.Qr}>
              {tokenInfo?.token && (
                <>
                  <QRCode
                    value={tokenInfo.token}
                    enableCORS={true}
                    size={225}
                    ecLevel="Q"
                    logoImage={"/favicon.svg"}
                    logoWidth={60}
                    logoHeight={60}
                    fgColor="#b49a0370"
                    bgColor="transparent"
                    style={{
                      cursor: "none",
                    }}
                  />
                  {timeLeft !== null && (
                    <p>Tiempo restante: {formatTime(timeLeft)} segundos</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attend;
