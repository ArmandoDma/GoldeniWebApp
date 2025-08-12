import React, { useEffect, useState } from "react";
import { useMaestro, type Maestro } from "~/hooks/useMaestro";
import styles from "../../modules/LoginForm.module.css";
import type { Route } from "../+types/LayoutAdmin";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Admin Portal" },
    { name: "description", content: "Panel de administración de Goldeni." },   
  ];
}

interface Props {
  editarNumeroEmpleado?: string;
  onSuccess?: () => void;
}

const MaestroForm: React.FC<Props> = ({ editarNumeroEmpleado, onSuccess }) => {
  const { maestros, crearMaestro, actualizarMaestro, loading, error } = useMaestro();

  const [form, setForm] = useState<Maestro>({
    numeroEmpleado: "",
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
    especialidad: "",
    idTurno: undefined,
    estadoMaestro: "Activo",
  });

  // Cambié a objeto para errores por campo
  const [formError, setFormError] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editarNumeroEmpleado) {
      const maestro = maestros.find((m) => m.numeroEmpleado === editarNumeroEmpleado);
      if (maestro) setForm(maestro);
    }
  }, [editarNumeroEmpleado, maestros]);

  // Expresiones regulares
  const regexNumeroEmpleado = /^\d+$/;
  const regexNombre = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
  const regexTelefono = /^\d{10}$/;
  const regexCodigoPostal = /^\d{5}$/;
  const regexEspecialidadDireccion = /^[a-zA-ZÀ-ÿ0-9\s]+$/;

  // Validación en tiempo real por campo
  const validarCampo = (name: string, value: string): string | null => {
    const fechaMin = new Date("1950-01-01");
    const fechaMax = new Date();
    fechaMax.setFullYear(fechaMax.getFullYear() - 21);

    switch (name) {
      case "numeroEmpleado":
        return regexNumeroEmpleado.test(value)
          ? null
          : "Número de empleado inválido (solo números).";
      case "nombre":
      case "apellidoPaterno":
      case "apellidoMaterno":
        return value && !regexNombre.test(value)
          ? "Solo letras y espacios (2-50 caracteres)."
          : null;
      case "telefono":
        return value && !regexTelefono.test(value)
          ? "Teléfono inválido (10 dígitos)."
          : null;
      case "codigoPostal":
        return value && !regexCodigoPostal.test(value)
          ? "Código postal inválido (5 dígitos)."
          : null;
      case "fechaNacimiento":
        const fecha = new Date(value);
        if (isNaN(fecha.getTime())) return "Fecha inválida.";
        if (fecha < fechaMin || fecha > fechaMax) {
          return `Fecha fuera de rango (1950 - ${fechaMax.getFullYear()}).`;
        }
        return null;
      case "especialidad":
      case "direccion":
        return value && !regexEspecialidadDireccion.test(value)
          ? "No se permiten caracteres especiales."
          : null;
      default:
        return null;
    }
  };

  // Actualizar form y error en tiempo real
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "estadoMaestro"
          ? value === "true"
          : ["idEstado", "idMunicipio", "idTurno"].includes(name)
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    }));

    // Validar solo el campo cambiado
    const errorMsg = validarCampo(name, value);
    setFormError((prev) => ({
      ...prev,
      [name]: errorMsg || "",
    }));
  };

  // Validar todo el formulario
  const validarFormulario = (): boolean => {
    const errores: Record<string, string> = {};

    for (const key in form) {
      const errorMsg = validarCampo(key, (form as any)[key] ?? "");
      if (errorMsg) {
        errores[key] = errorMsg;
      }
    }

    if (!["M", "F", "O"].includes(form.genero)) {
      errores["genero"] = "Seleccione un género válido.";
    }
    if (!form.idEstado) {
      errores["idEstado"] = "Seleccione un estado.";
    }
    if (!form.idMunicipio) {
      errores["idMunicipio"] = "Seleccione un municipio.";
    }
    if (!form.idTurno) {
      errores["idTurno"] = "Seleccione un turno.";
    }

    setFormError(errores);

    return Object.keys(errores).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      if (editarNumeroEmpleado) {
        await actualizarMaestro(editarNumeroEmpleado, form);
      } else {
        await crearMaestro(form);
      }
      onSuccess?.();
      alert("Maestro Creado Exitosamente...")
    } catch {
      // Manejo de error en el hook
    }
  };

  return (
    <div className={styles.hdrform}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formlg}>
          <div className={styles.cnt}>
            <span>
              <p>{editarNumeroEmpleado ? "Editar Maestro" : "Nuevo Maestro"}</p>
              <p>Formulario</p>
            </span>
          </div>
        </div>

        <input
          type="text"
          name="numeroEmpleado"
          placeholder="Número de Empleado"
          value={form.numeroEmpleado}
          onChange={handleChange}
          disabled={!!editarNumeroEmpleado}
          required
        />
        {formError.numeroEmpleado && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.numeroEmpleado}</p>
        )}

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        {formError.nombre && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.nombre}</p>
        )}

        <input
          name="apellidoPaterno"
          placeholder="Apellido Paterno"
          value={form.apellidoPaterno}
          onChange={handleChange}
          required
        />
        {formError.apellidoPaterno && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.apellidoPaterno}</p>
        )}

        <input
          name="apellidoMaterno"
          placeholder="Apellido Materno"
          value={form.apellidoMaterno}
          onChange={handleChange}
        />
        {formError.apellidoMaterno && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.apellidoMaterno}</p>
        )}

        <div className={styles.comUsr}>
          <select name="genero" value={form.genero} onChange={handleChange} required>
            <option value="">Selecciona género</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
          {formError.genero && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.genero}</p>
          )}
        </div>

        <input
          type="date"
          name="fechaNacimiento"
          value={form.fechaNacimiento}
          onChange={handleChange}
          required
          min="1950-01-01"
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 17))
            .toISOString()
            .slice(0, 10)}
        />
        {formError.fechaNacimiento && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.fechaNacimiento}</p>
        )}

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
        />
        {formError.telefono && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.telefono}</p>
        )}

        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        />
        {formError.direccion && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.direccion}</p>
        )}

        <input
          name="codigoPostal"
          placeholder="Código Postal"
          value={form.codigoPostal}
          onChange={handleChange}
        />
        {formError.codigoPostal && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.codigoPostal}</p>
        )}

        <input
          name="especialidad"
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={handleChange}
          required
        />
        {formError.especialidad && (
          <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.especialidad}</p>
        )}

        <div className={styles.comUsr}>
          <select
            name="idEstado"
            value={form.idEstado ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona Estado</option>
            <option value={1}>Estado 1</option>
            <option value={2}>Estado 2</option>
          </select>
          {formError.idEstado && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.idEstado}</p>
          )}
        </div>

        <div className={styles.comUsr}>
          <select
            name="idMunicipio"
            value={form.idMunicipio ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona Municipio</option>
            <option value={1}>Municipio 1</option>
            <option value={2}>Municipio 2</option>
          </select>
          {formError.idMunicipio && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.idMunicipio}</p>
          )}
        </div>

        <div className={styles.comUsr}>
          <select
            name="idTurno"
            value={form.idTurno ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona Turno</option>
            <option value={1}>Matutino</option>
            <option value={2}>Vespertino</option>
          </select>
          {formError.idTurno && (
            <p style={{ color: "red", fontSize: "0.85rem" }}>{formError.idTurno}</p>
          )}
        </div>

        <input
          type="submit"
          value={editarNumeroEmpleado ? "Actualizar" : "Registrar"}
          disabled={loading}
        />

        {error && (
          <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>
        )}
      </form>
    </div>
  );
};

export default MaestroForm;
