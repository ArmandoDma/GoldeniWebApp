import React, { useEffect, useState } from "react";
import { useAlumno, type Alumno } from "~/hooks/useAlumno";
import styles from "../../modules/AlumnForm.module.css";
import type { Route } from "../+types/LayoutAdmin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Admin Portal" },
    { name: "description", content: "Panel de administración de Goldeni." },   
  ];
}

interface Props {
  editarMatricula?: string;
  onSuccess?: () => void;
}

const AlumnoForm: React.FC<Props> = ({ editarMatricula, onSuccess }) => {
  const {
    alumnos,
    crearAlumno,
    actualizarAlumno,
    loading,
    error: hookError,
  } = useAlumno();

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
    estadoAlumno: "Activo",
    idGrado: undefined,
    idGrupo: undefined,
    idPeriodo: undefined,
  });

  // errores por campo y error general
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // precargar alumno al editar
  useEffect(() => {
    if (editarMatricula && alumnos.length) {
      const alumno = alumnos.find((a) => a.matricula === editarMatricula);
      if (alumno) setForm(alumno);
    }
  }, [editarMatricula, alumnos]);

  // regex (matrícula: solo números, 5-15 dígitos)
  const regexMatricula = /^[0-9]{5,15}$/;
  const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
  const regexTelefono = /^[0-9]{10}$/;
  const regexCodigoPostal = /^[0-9]{5}$/;
  const regexFecha =
    /^(19[5-9][0-9]|20[0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  // validar un campo en tiempo real
  const validarCampo = (name: string, value: string | number | undefined) => {
    let mensaje = "";

    const v = typeof value === "number" ? String(value) : value ?? "";

    if (name === "fechaNacimiento") {
      const fechaMin = new Date("1950-01-01");
      const fechaMax = new Date();
      fechaMax.setFullYear(fechaMax.getFullYear() - 17);

      if (!regexFecha.test(v)) {
        mensaje = "Formato inválido (YYYY-MM-DD).";
      } else {
        const fecha = new Date(v);
        if (fecha < fechaMin)
          mensaje = "La fecha debe ser mayor o igual a 1950-01-01.";
        else if (fecha > fechaMax)
          mensaje = `La fecha debe ser menor o igual a ${fechaMax
            .toISOString()
            .slice(0, 10)} (mínimo 17 años).`;
      }
    } else {
      switch (name) {
        case "matricula":
          if (!regexMatricula.test(v))
            mensaje = "Debe contener solo números (5-15 dígitos).";
          break;
        case "nombre":
        case "apellidoPaterno":
          if (!regexTexto.test(v))
            mensaje = "Solo letras y espacios (2-50 caracteres).";
          break;
        case "apellidoMaterno":
          if (v && !regexTexto.test(v))
            mensaje = "Solo letras y espacios (2-50 caracteres).";
          break;
        case "telefono":
          if (v && !regexTelefono.test(v))
            mensaje = "Debe contener exactamente 10 dígitos.";
          break;
        case "codigoPostal":
          if (v && !regexCodigoPostal.test(v))
            mensaje = "Debe contener exactamente 5 dígitos.";
          break;
      }
    }

    setErrors((prev) => ({ ...prev, [name]: mensaje }));
  };

  // validar todo al enviar
  const validarFormulario = (): boolean => {
    setFormError(null);
    const newErrors: Record<string, string> = {};

    if (!regexMatricula.test(form.matricula)) {
      newErrors.matricula =
        "La matrícula debe contener solo números (5-15 dígitos).";
    }
    if (!regexTexto.test(form.nombre)) {
      newErrors.nombre =
        "El nombre debe contener solo letras y espacios (2-50 caracteres).";
    }
    if (!regexTexto.test(form.apellidoPaterno)) {
      newErrors.apellidoPaterno =
        "El apellido paterno debe contener solo letras y espacios (2-50 caracteres).";
    }
    if (form.apellidoMaterno && !regexTexto.test(form.apellidoMaterno)) {
      newErrors.apellidoMaterno =
        "El apellido materno debe contener solo letras y espacios (2-50 caracteres).";
    }
    if (form.telefono && !regexTelefono.test(form.telefono)) {
      newErrors.telefono = "El teléfono debe contener exactamente 10 dígitos.";
    }
    if (form.codigoPostal && !regexCodigoPostal.test(form.codigoPostal)) {
      newErrors.codigoPostal =
        "El código postal debe contener exactamente 5 dígitos.";
    }
    if (!["M", "F", "O"].includes(form.genero)) {
      newErrors.genero = "El género debe ser Masculino, Femenino u Otro.";
    }

    const fechaMin = new Date("1950-01-01");
    const fechaMax = new Date();
    fechaMax.setFullYear(fechaMax.getFullYear() - 17);

    if (!regexFecha.test(form.fechaNacimiento)) {
      newErrors.fechaNacimiento = "La fecha debe estar en formato YYYY-MM-DD.";
    } else {
      const fecha = new Date(form.fechaNacimiento);
      if (fecha < fechaMin)
        newErrors.fechaNacimiento =
          "La fecha debe ser mayor o igual a 1950-01-01.";
      else if (fecha > fechaMax)
        newErrors.fechaNacimiento = `La fecha debe ser menor o igual a ${fechaMax
          .toISOString()
          .slice(0, 10)} (mínimo 17 años).`;
    }

    // campos obligatorios de selección (números)
    const requiredSelects = [
      "idEstado",
      "idMunicipio",
      "idCarrera",
      "idTurno",
      "idGrado",
      "idGrupo",
      "idPeriodo",
    ] as const;

    requiredSelects.forEach((key) => {
      // @ts-ignore - index dinámico
      if (!form[key]) newErrors[key] = "Debe seleccionar este campo.";
    });

    setErrors(newErrors);

    const tieneErrores = Object.values(newErrors).some(
      (m) => m && m.length > 0
    );
    if (tieneErrores) {
      setFormError("Corrige los errores antes de enviar.");
      return false;
    }

    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const numberFields = [
      "idEstado",
      "idMunicipio",
      "idCarrera",
      "idTurno",
      "idGrado",
      "idGrupo",
      "idPeriodo",
    ];

    const newValue = numberFields.includes(name)
      ? value === ""
        ? undefined
        : Number(value)
      : value;

    setForm((prev) => ({ ...prev, [name]: newValue } as unknown as Alumno));

    // validar en tiempo real si es input tipo string (fecha, texto, etc.)
    validarCampo(name, newValue as any);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validarFormulario()) return;

    try {
      if (editarMatricula) {
        await actualizarAlumno(editarMatricula, form);
      } else {
        await crearAlumno(form);
      }
      if (onSuccess) onSuccess();
    } catch (e) {
      // hook ya setea error, pero mostramos mensaje general si hace falta
      setFormError(hookError || "Ocurrió un error al guardar.");
    }
  };

  return (
    <div className={styles.hdrMn}>
      <div className={styles.hdrform}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formlg}>
            <div className={styles.cnt}>
              <img src="/favicon.svg" alt="logo" />
              <span>
                <p>{editarMatricula ? "Editar Alumno" : "Registrar Alumno"}</p>
                <p>Formulario escolar</p>
              </span>
            </div>
          </div>

          {/* GRID 2 columnas */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            <div>
              <input
                type="text"
                name="matricula"
                placeholder="Matrícula"
                value={form.matricula}
                onChange={handleChange}
                disabled={!!editarMatricula}
                required
              />
              {errors.matricula && (
                <p style={{ color: "red" }}>{errors.matricula}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              {errors.nombre && <p style={{ color: "red" }}>{errors.nombre}</p>}
            </div>

            <div>
              <input
                type="text"
                name="apellidoPaterno"
                placeholder="Apellido Paterno"
                value={form.apellidoPaterno}
                onChange={handleChange}
                required
              />
              {errors.apellidoPaterno && (
                <p style={{ color: "red" }}>{errors.apellidoPaterno}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="apellidoMaterno"
                placeholder="Apellido Materno"
                value={form.apellidoMaterno}
                onChange={handleChange}
              />
              {errors.apellidoMaterno && (
                <p style={{ color: "red" }}>{errors.apellidoMaterno}</p>
              )}
            </div>

            <div>
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
              {errors.genero && <p style={{ color: "red" }}>{errors.genero}</p>}
            </div>

            <div>
              <input
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={handleChange}
                required
              />
              {errors.fechaNacimiento && (
                <p style={{ color: "red" }}>{errors.fechaNacimiento}</p>
              )}
            </div>

            <div>
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                value={form.telefono}
                onChange={handleChange}
              />
              {errors.telefono && (
                <p style={{ color: "red" }}>{errors.telefono}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={form.direccion}
                onChange={handleChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="codigoPostal"
                placeholder="Código Postal"
                value={form.codigoPostal}
                onChange={handleChange}
              />
              {errors.codigoPostal && (
                <p style={{ color: "red" }}>{errors.codigoPostal}</p>
              )}
            </div>

            {/* Select Estado */}
            <div className={styles.comUsr}>
              <select
                name="idEstado"
                value={form.idEstado ?? ""}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona Estado</option>
                <option value="1">Estado Ejemplo 1</option>
                <option value="2">Estado Ejemplo 2</option>
              </select>
              {errors.idEstado && (
                <p style={{ color: "red" }}>{errors.idEstado}</p>
              )}
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
                <option value="1">Municipio Ejemplo 1</option>
                <option value="2">Municipio Ejemplo 2</option>
              </select>
              {errors.idMunicipio && (
                <p style={{ color: "red" }}>{errors.idMunicipio}</p>
              )}
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
              {errors.idCarrera && (
                <p style={{ color: "red" }}>{errors.idCarrera}</p>
              )}
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
              {errors.idTurno && (
                <p style={{ color: "red" }}>{errors.idTurno}</p>
              )}
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
              {errors.idGrado && (
                <p style={{ color: "red" }}>{errors.idGrado}</p>
              )}
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
              {errors.idGrupo && (
                <p style={{ color: "red" }}>{errors.idGrupo}</p>
              )}
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
                <option value="1">2025-1</option>
                <option value="2">2025-2</option>
              </select>
              {errors.idPeriodo && (
                <p style={{ color: "red" }}>{errors.idPeriodo}</p>
              )}
            </div>

            {/* Submit - full width */}
            <div
              style={{
                gridColumn: "span 2",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="submit"
                value={
                  editarMatricula ? "Actualizar Alumno" : "Registrar Alumno"
                }
                disabled={loading}
              />
            </div>
          </div>

          {(formError || hookError) && (
            <p
              style={{
                color: "red",
                textAlign: "center",
                marginTop: "0.75rem",
              }}
            >
              {formError || hookError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AlumnoForm;
