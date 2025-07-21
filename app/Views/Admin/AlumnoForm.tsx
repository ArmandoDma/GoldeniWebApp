import React, { useEffect, useState } from "react";
import { useAlumno, type Alumno } from "~/hooks/useAlumno";
import styles from "../../modules/LoginForm.module.css"; 

interface Props {
  editarMatricula?: string;
  onSuccess?: () => void;
}

const AlumnoForm: React.FC<Props> = ({ editarMatricula, onSuccess }) => {
  const { alumnos, crearAlumno, actualizarAlumno, loading, error } = useAlumno();

  const [form, setForm] = useState<Alumno>({
    matricula: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    genero: "",
    fechaNacimiento: "",
    telefono: "",
    direccion: "",
    codigoPostal: "",
    idMunicipio: undefined,
    idEstado: undefined,
    idCarrera: undefined,
    idTurno: undefined,
    estadoAlumno: true,
    idGrado: undefined,
    idGrupo: undefined,
    idPeriodo: undefined,
  });

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (editarMatricula) {
      const alumno = alumnos.find((a) => a.matricula === editarMatricula);
      if (alumno) setForm(alumno);
    }
  }, [editarMatricula, alumnos]);

  const validarFormulario = (): boolean => {
    setFormError(null);

    const regexMatricula = /^[A-Za-z0-9]{5,15}$/;
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    const regexTelefono = /^\d{10}$/;
    const regexCodigoPostal = /^\d{5}$/;

    if (!regexMatricula.test(form.matricula)) {
      setFormError("La matrícula debe tener entre 5 y 15 caracteres alfanuméricos.");
      return false;
    }
    if (!regexNombre.test(form.nombre)) {
      setFormError("El nombre debe contener solo letras y espacios (2-50 caracteres).");
      return false;
    }
    if (!regexNombre.test(form.apellidoPaterno)) {
      setFormError("El apellido paterno debe contener solo letras y espacios (2-50 caracteres).");
      return false;
    }
    if (form.apellidoMaterno && !regexNombre.test(form.apellidoMaterno)) {
      setFormError("El apellido materno debe contener solo letras y espacios (2-50 caracteres).");
      return false;
    }
    if (form.telefono && !regexTelefono.test(form.telefono)) {
      setFormError("El teléfono debe contener exactamente 10 dígitos.");
      return false;
    }
    if (form.codigoPostal && !regexCodigoPostal.test(form.codigoPostal)) {
      setFormError("El código postal debe contener exactamente 5 dígitos.");
      return false;
    }
    if (!["M", "F", "O"].includes(form.genero)) {
      setFormError("El género debe ser Masculino, Femenino u Otro.");
      return false;
    }
    if (new Date(form.fechaNacimiento) > new Date()) {
      setFormError("La fecha de nacimiento no puede ser futura.");
      return false;
    }
    if (
      !form.idEstado ||
      !form.idMunicipio ||
      !form.idCarrera ||
      !form.idTurno ||
      !form.idGrado ||
      !form.idGrupo ||
      !form.idPeriodo
    ) {
      setFormError("Debe seleccionar todos los datos relacionados.");
      return false;
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "estadoAlumno" ? value === "true" : value === "" ? undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarFormulario()) return;

    try {
      if (editarMatricula) {
        await actualizarAlumno(editarMatricula, form);
      } else {
        await crearAlumno(form);
      }
      if (onSuccess) onSuccess();
    } catch {
      // error ya manejado en hook
    }
  };

  return (
    <div className={styles.hdrMn}>
      <div className={styles.hdrform}>
        <form onSubmit={handleSubmit}>

          <div className={styles.formlg}>
            <div className={styles.cnt}>
              <img src="/logo192.png" alt="logo" />
              <span>
                <p>{editarMatricula ? "Editar Alumno" : "Registrar Alumno"}</p>
                <p>Formulario escolar</p>
              </span>
            </div>
          </div>

          <input
            name="matricula"
            placeholder="Matrícula"
            value={form.matricula}
            onChange={handleChange}
            disabled={!!editarMatricula}
            required
          />

          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            name="apellidoPaterno"
            placeholder="Apellido Paterno"
            value={form.apellidoPaterno}
            onChange={handleChange}
            required
          />

          <input
            name="apellidoMaterno"
            placeholder="Apellido Materno"
            value={form.apellidoMaterno}
            onChange={handleChange}
          />

          <div className={styles.comUsr}>
            <select
              name="genero"
              value={form.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>

          <input
            type="date"
            name="fechaNacimiento"
            value={form.fechaNacimiento}
            onChange={handleChange}
            required
          />

          <input
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />

          <input
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
          />

          <input
            name="codigoPostal"
            placeholder="Código Postal"
            value={form.codigoPostal}
            onChange={handleChange}
          />

          {/* Select Estado */}
          <div className={styles.comUsr}>
            <select
              name="idEstado"
              value={form.idEstado ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Estado</option>
              {/* Aquí debes mapear estados desde tus datos reales */}
              <option value="1">Estado Ejemplo 1</option>
              <option value="2">Estado Ejemplo 2</option>
            </select>
          </div>

          {/* Select Municipio */}
          <div className={styles.comUsr}>
            <select
              name="idMunicipio"
              value={form.idMunicipio ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Municipio</option>
              {/* Mapea municipios según estado */}
              <option value="1">Municipio Ejemplo 1</option>
              <option value="2">Municipio Ejemplo 2</option>
            </select>
          </div>

          {/* Select Carrera */}
          <div className={styles.comUsr}>
            <select
              name="idCarrera"
              value={form.idCarrera ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Carrera</option>
              <option value="1">Ingeniería en Sistemas</option>
              <option value="2">Licenciatura en Administración</option>
            </select>
          </div>

          {/* Select Turno */}
          <div className={styles.comUsr}>
            <select
              name="idTurno"
              value={form.idTurno ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Turno</option>
              <option value="1">Matutino</option>
              <option value="2">Vespertino</option>
            </select>
          </div>

          {/* Select Grado */}
          <div className={styles.comUsr}>
            <select
              name="idGrado"
              value={form.idGrado ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Grado</option>
              <option value="1">Primero</option>
              <option value="2">Segundo</option>
              <option value="3">Tercero</option>
            </select>
          </div>

          {/* Select Grupo */}
          <div className={styles.comUsr}>
            <select
              name="idGrupo"
              value={form.idGrupo ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Grupo</option>
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </select>
          </div>

          {/* Select Periodo */}
          <div className={styles.comUsr}>
            <select
              name="idPeriodo"
              value={form.idPeriodo ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona Periodo</option>
              <option value="2025-1">2025-1</option>
              <option value="2025-2">2025-2</option>
            </select>
          </div>

          <input
            type="submit"
            value={editarMatricula ? "Actualizar Alumno" : "Registrar Alumno"}
            disabled={loading}
          />

          {(formError || error) && (
            <p style={{ color: "red", textAlign: "center" }}>{formError || error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AlumnoForm;
