import { useGroups } from "~/hooks/useGroups";
import type { Route } from "../../+types/root";
import styles from "../../modules/Groups.module.css";
import { Loader } from "~/Components/Loader";
import { IconEye } from "@tabler/icons-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "Lista de grupos asignados al maestro" },
  ];
}

const Groups = () => {
  const { grupos, loading, error } = useGroups();

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.ctGroups}>
      {grupos.length === 0 ? (
        <p className={styles.studentsCount}>No tiene grupos asignados.</p>
      ) : (
        grupos.map((grupo) => (
          <>
            <div className={styles.ctTiG}>
              <h2>Mis Grupos</h2>
            </div>
            <div className={styles.groupsContainer}>
              <div key={grupo.idGrupo} className={styles.groupCard}>
                <div className={styles.avatarCircle}>
                  {getInitials(grupo.nombreGrupo)}
                </div>
                <h3 className={styles.groupHeader}>{grupo.nombreGrupo}</h3>

                <p className={styles.studentsCount}>
                  {grupo.alumnos.length} alumno(s)
                </p>

                {grupo.fechaCreacion && (
                  <p style={{ fontSize: "0.85rem", color: "#777" }}>
                    Creado el:{" "}
                    {new Date(grupo.fechaCreacion).toLocaleDateString()}
                  </p>
                )}

                <button
                  style={{
                    marginTop: "12px",
                    backgroundColor: "#0052cc",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                    border: "none",
                    fontFamily: "inherit",
                    padding: "8px 16px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => alert(`Grupo: ${grupo.nombreGrupo}`)}
                >
                 <IconEye size={20}
                 color="#fff" style={{marginRight: 10}} />  Ver Grupo
                </button>
              </div>
            </div>
          </>
        ))
      )}
    </div>
  );
};

export default Groups;

function getInitials(nombre: string) {
  return nombre
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase();
}
