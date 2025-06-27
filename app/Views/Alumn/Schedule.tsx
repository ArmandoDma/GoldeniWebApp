import { useEffect, useState } from "react";
import { Loader } from "~/Components/Loader";
import style from "../../modules/Schedule.module.css";
import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

const initialSchedule: string[][] = [
  [
    "Programación Orientada a Objetos",
    "Administración de Bases de Datos",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
  ],
  [
    "Fundamentos de Redes",
    "Sistemas Operativos",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
  ],
  [
    "Desarrollo Web",
    "Estándares y Métricas",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
    "Empty",
  ],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
  ["Empty", "Empty", "Empty", "Empty", "Empty", "Empty", "Empty"],
];

const subjects: string[] = [
  "Programación Orientada a Objetos",
  "Administración de Bases de Datos",
  "Fundamentos de Redes",
  "Sistemas Operativos",
  "Desarrollo Web",
  "Estándares y Métricas",
];

const times: string[] = [
  "17:20",
  "18:00",
  "18:40",
  "19:20",
  "20:00",
  "20:40",
  "21:20",
];

const days: string[] = ["Mo", "Tu", "We", "Th", "Fr"];

const teachers: Record<string, string> = {
  "Programación Orientada a Objetos": "Pablo Mendoza",
  "Administración de Bases de Datos": "Marcos Hernández",
  "Fundamentos de Redes": "Saúl García",
  "Sistemas Operativos": "Rebeca López",
  "Desarrollo Web": "Pablo Ríos",
  "Estándares y Métricas": "Marcos Morales",
};

const STORAGE_KEY = "scheduleData";

export default function Schedule() {
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState<string[][]>(initialSchedule);
  const [hoverCell, setHoverCell] = useState<{ day: number; time: number } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSchedule(parsed);
      } catch {}
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    alert("Horario guardado correctamente.");
  };

  const handleReset = () => {
    if (window.confirm("¿Quieres resetear el horario al inicial?")) {
      setSchedule(initialSchedule);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ schedule, days, times, teachers }, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "horario.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Validación para que no se repita materia en un día
  const canAssignSubject = (dayIdx: number, subject: string) => {
    return !schedule[dayIdx].includes(subject);
  };

  const handleCellClick = (dayIdx: number, timeIdx: number): void => {
    const updated = schedule.map((row) => [...row]);
    const currentSubject = updated[dayIdx][timeIdx];
    const currentIndex = subjects.indexOf(currentSubject);

    let nextSubject =
      currentIndex === -1 || currentIndex === subjects.length - 1
        ? "Empty"
        : subjects[currentIndex + 1];

    // Validar antes de asignar
    if (nextSubject !== "Empty" && !canAssignSubject(dayIdx, nextSubject)) {
      alert(`La materia "${nextSubject}" ya está asignada en este día.`);
      return;
    }

    updated[dayIdx][timeIdx] = nextSubject;
    setSchedule(updated);
  };

  if (loading) return <Loader />;

  return (
    <div className={style.scheduleContainer}>
      <div className={style.scheduleHeader}>
        <h1>Crear Horario</h1>
        <div className={style.buttons}>
          <button className={style.save} onClick={handleSave}>
            Guardar
          </button>
          <button className={style.cancel} onClick={handleReset}>
            Resetear
          </button>
          <button className={style.save} onClick={handleExport}>
            Exportar JSON
          </button>
        </div>
      </div>

      <div className={style.scheduleGrid}>
        <div className={style.gridHeader}>
          <div></div>
          {days.map((day, i) => (
            <div key={day} className={style.dayHeader}>
              {day}
            </div>
          ))}
        </div>

        {times.map((time, timeIdx) => (
          <div key={time} className={style.gridRow}>
            <div className={style.timeLabel}>{time}</div>
            {days.map((_, dayIdx) => {
              const subject = schedule[dayIdx][timeIdx];
              const isHover = hoverCell?.day === dayIdx && hoverCell?.time === timeIdx;
              return (
                <div
                  key={dayIdx}
                  className={`${style.cell} ${
                    subject !== "Empty" ? style.filled : style.empty
                  } ${isHover ? style.hovered : ""}`}
                  onClick={() => handleCellClick(dayIdx, timeIdx)}
                  onMouseEnter={() => setHoverCell({ day: dayIdx, time: timeIdx })}
                  onMouseLeave={() => setHoverCell(null)}
                  title={
                    subject !== "Empty"
                      ? `${subject}\nProfesor: ${teachers[subject]}`
                      : "Vacío"
                  }
                >
                  {subject !== "Empty" ? (
                    <>
                      <strong>{subject}</strong>
                      <br />
                      <small>{teachers[subject]}</small>
                    </>
                  ) : (
                    <em>Vacío</em>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
