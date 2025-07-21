import React, { useEffect, useState } from "react";
import { useMaestro, type Maestro } from "~/hooks/useMaestro";
import styles from "../../modules/LoginForm.module.css";

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
    estadoMaestro: true,
  });

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (editarNumeroEmpleado) {
      const maestro = maestros.find((m) => m.numeroEmpleado === editarNumeroEmpleado);
      if (maestro) setForm(maestro);
    }
  }, [editarNumeroEmpleado, maestros]);

  const validarFormulario = (): boolean => {
    setFormError(null);

    const regexNumeroEmpleado = /^[A-Za-z0-9]{5,15}$/;
    const regexNombre = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;
    const regexTelefono = /^\d{10}$/;
    const regexCodigoPostal = /^\d{5}$/;

    if (!regexNumeroEmpleado.test(form.numeroEmpleado)) {
      setFormError("Número de empleado inválido (5-15 alfanuméricos).");
      return false;
    }
    if (!regexNombre.test(form.nombre)) {
      setFormError("Nombre inválido (solo letras y espacios, 2-50 caracteres).");
      return false;
    }
    if (!regexNombre.test(form.apellidoPaterno)) {
      setFormError("Apellido paterno inválido.");
      return false;
    }
    if (form.apellidoMaterno && !regexNombre.test(form.apellidoMaterno)) {
      setFormError("Apellido materno inválido.");
      return false;
    }
    if (form.telefono && !regexTelefono.test(form.telefono)) {
      setFormError("Teléfono inválido (10 dígitos).");
      return false;
    }
    if (form.codigoPostal && !regexCodigoPostal.test(form.codigoPostal)) {
      setFormError("Código postal inválido (5 dígitos).");
      return false;
    }
    if (!["M", "F", "O"].includes(form.genero)) {
      setFormError("Seleccione un género válido.");
      return false;
    }
    if (new Date(form.fechaNacimiento) > new Date()) {
      setFormError("La fecha de nacimiento no puede ser futura.");
      return false;
    }
    if (!form.idEstado || !form.idMunicipio || !form.idTurno) {
      setFormError("Seleccione estado, municipio y turno.");
      return false;
    }
    if (!form.especialidad || form.especialidad.trim().length < 2) {
      setFormError("Especialidad inválida.");
      return false;
    }

    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "estadoMaestro" ? value === "true" : value === "" ? undefined : value,
    }));
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
    } catch {
      // Error manejado en hook
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
          <select name="genero" value={form.genero} onChange={handleChange} required>
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

        <input
          name="especialidad"
          placeholder="Especialidad"
          value={form.especialidad}
          onChange={handleChange}
          required
        />

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
        </div>

        <input
          type="submit"
          value={editarNumeroEmpleado ? "Actualizar" : "Registrar"}
          disabled={loading}
        />

        {(formError || error) && (
          <p style={{ color: "red", fontSize: "0.9rem", textAlign: "center" }}>
            {formError || error}
          </p>
        )}
      </form>
    </div>
  );
};

export default MaestroForm;
