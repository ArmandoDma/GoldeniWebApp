import React from "react";
import "../../modules/Calendar.css";
import { Outlet } from 'react-router';
import type { Route } from "../../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}


interface Day {
  //key: string;
  dayNumber: number | null;
  className?: string;
}

interface Month {
  name: string;
  days: Day[];
}

const meses: Month[] = [
  {
    name: "Enero",
    days: [
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: 1, className: "Dias-Festivos" },
      { dayNumber: 2, className: "school-event" },
      { dayNumber: 3, className: "school-event" },
      { dayNumber: 4 },
      { dayNumber: 5 },
      { dayNumber: 6, className: "inicio" },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17 },
      { dayNumber: 18 },
      { dayNumber: 19 },
      { dayNumber: 20, className: "parcial" },
      { dayNumber: 21, className: "parcial" },
      { dayNumber: 22, className: "parcial" },
      { dayNumber: 23, className: "parcial" },
      { dayNumber: 24, className: "parcial" },
      { dayNumber: 25 },
      { dayNumber: 26 },
      { dayNumber: 27, className: "revaloracion-parcial" },
      { dayNumber: 28, className: "revaloracion-parcial" },
      { dayNumber: 29, className: "revaloracion-parcial" },
      { dayNumber: 30 },
      { dayNumber: 31 },
    ],
  },
  {
    name: "Febrero",
    days: [
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: 1 },
      { dayNumber: 2 },
      { dayNumber: 3, className: "Dias-Festivos" },
      { dayNumber: 4 },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17, className: "parcial" },
      { dayNumber: 18, className: "parcial" },
      { dayNumber: 19, className: "parcial" },
      { dayNumber: 20, className: "parcial" },
      { dayNumber: 21, className: "parcial" },
      { dayNumber: 22 },
      { dayNumber: 23 },
      { dayNumber: 24, className: "revaloracion-parcial" },
      { dayNumber: 25, className: "revaloracion-parcial" },
      { dayNumber: 26, className: "revaloracion-parcial" },
      { dayNumber: 27 },
      { dayNumber: 28 },
    ],
  },
  {
    name: "Marzo",
    days: [
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: 1 },
      { dayNumber: 2 },
      { dayNumber: 3 },
      { dayNumber: 4 },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17, className: "Dias-Festivos" },
      { dayNumber: 18, className: "parcial" },
      { dayNumber: 19, className: "parcial" },
      { dayNumber: 20, className: "parcial" },
      { dayNumber: 21, className: "parcial" },
      { dayNumber: 22 },
      { dayNumber: 23 },
      { dayNumber: 24, className: "parcial" },
      { dayNumber: 25, className: "revaloracion-parcial" },
      { dayNumber: 26, className: "revaloracion-parcial" },
      { dayNumber: 27, className: "revaloracion-parcial" },
      { dayNumber: 28 },
      { dayNumber: 29 },
      { dayNumber: 30 },
      { dayNumber: 31 },
    ],
  },
  {
    name: "Abril",
    days: [
      { dayNumber: null },
      { dayNumber: 1 },
      { dayNumber: 2 },
      { dayNumber: 3 },
      { dayNumber: 4, className: "revaloracion-final" },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7, className: "revaloracion-final" },
      { dayNumber: 8, className: "Calificaciones-estadia" },
      { dayNumber: 9, className: "Entrega-evaluacion" },
      { dayNumber: 10 },
      { dayNumber: 11, className: "Entrega-liberacionE" },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14, className: "school-event" },
      { dayNumber: 15, className: "school-event" },
      { dayNumber: 16, className: "school-event" },
      { dayNumber: 17, className: "school-event" },
      { dayNumber: 18, className: "school-event" },
      { dayNumber: 19 },
      { dayNumber: 20 },
      { dayNumber: 21, className: "school-event" },
      { dayNumber: 22, className: "school-event" },
      { dayNumber: 23, className: "school-event" },
      { dayNumber: 24, className: "school-event" },
      { dayNumber: 25, className: "school-event" },
      { dayNumber: 26 },
      { dayNumber: 27 },
      { dayNumber: 28 },
      { dayNumber: 29 },
      { dayNumber: 30, className: "Final-cuatrimestre" },
    ],
  },
  {
    name: "Mayo",
    days: [
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: 1, className: "Dias-Festivos" },
      { dayNumber: 2, className: "inicio" },
      { dayNumber: 3 },
      { dayNumber: 4 },
      { dayNumber: 5, className: "Dias-Festivos" },
      { dayNumber: 6 },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15, className: "Dias-Festivos" },
      { dayNumber: 16 },
      { dayNumber: 17 },
      { dayNumber: 18 },
      { dayNumber: 19 },
      { dayNumber: 20 },
      { dayNumber: 21 },
      { dayNumber: 22 },
      { dayNumber: 23 },
      { dayNumber: 24 },
      { dayNumber: 25 },
      { dayNumber: 26, className: "parcial" },
      { dayNumber: 27, className: "parcial" },
      { dayNumber: 28, className: "parcial" },
      { dayNumber: 29, className: "parcial" },
      { dayNumber: 30, className: "parcial" },
      { dayNumber: 31 },
    ],
  },
  {
    name: "Junio",
    days: [
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: null },
      { dayNumber: 1 },
      { dayNumber: 2, className: "revaloracion-parcial" },
      { dayNumber: 3, className: "revaloracion-parcial" },
      { dayNumber: 4, className: "revaloracion-parcial" },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7 },
      { dayNumber: 8 },
      { dayNumber: 9 },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17 },
      { dayNumber: 18 },
      { dayNumber: 19 },
      { dayNumber: 20 },
      { dayNumber: 21 },
      { dayNumber: 22 },
      { dayNumber: 23 },
      { dayNumber: 24 },
      { dayNumber: 25 },
      { dayNumber: 26 },
      { dayNumber: 27 },
      { dayNumber: 28 },
      { dayNumber: 29 },
      { dayNumber: 30, className: "parcial" },
    ],
  },
  {
    name: "Julio",
    days: [
      { dayNumber: null },
      { dayNumber: 1, className: "parcial" },
      { dayNumber: 2, className: "parcial" },
      { dayNumber: 3, className: "parcial" },
      { dayNumber: 4, className: "parcial" },
      { dayNumber: 5 },
      { dayNumber: 6 },
      { dayNumber: 7, className: "revaloracion-parcial" },
      { dayNumber: 8, className: "revaloracion-parcial" },
      { dayNumber: 9, className: "revaloracion-parcial" },
      { dayNumber: 10 },
      { dayNumber: 11 },
      { dayNumber: 12 },
      { dayNumber: 13 },
      { dayNumber: 14 },
      { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17 },
      { dayNumber: 18 },
      { dayNumber: 19 },
      { dayNumber: 20 },
      { dayNumber: 21, className: "school-event" },
      { dayNumber: 22, className: "school-event" },
      { dayNumber: 23, className: "school-event" },
      { dayNumber: 24, className: "school-event" },
      { dayNumber: 25, className: "school-event" },
      { dayNumber: 26 },
      { dayNumber: 27 },
      { dayNumber: 28, className: "school-event" },
      { dayNumber: 29, className: "school-event" },
      { dayNumber: 30, className: "school-event" },
      { dayNumber: 31, className: "school-event" },
    ],
  },
  {
    name: "Agosto",
    days: [
      { dayNumber: null }, { dayNumber: null }, { dayNumber: null }, { dayNumber: null },
      { dayNumber: 1, className: "school-event" },
      { dayNumber: 2 }, { dayNumber: 3 }, { dayNumber: 4 }, { dayNumber: 5 }, { dayNumber: 6 }, { dayNumber: 7 },
      { dayNumber: 8 }, { dayNumber: 9 }, { dayNumber: 10 },
      { dayNumber: 11, className: "parcial" },
      { dayNumber: 12, className: "parcial" },
      { dayNumber: 13, className: "parcial" },
      { dayNumber: 14, className: "parcial" },
      { dayNumber: 15, className: "parcial" },
      { dayNumber: 16 }, { dayNumber: 17 },
      { dayNumber: 18, className: "revaloracion-parcial" },
      { dayNumber: 19, className: "revaloracion-parcial" },
      { dayNumber: 20, className: "revaloracion-parcial" },
      { dayNumber: 21, className: "revaloracion-final" },
      { dayNumber: 22, className: "revaloracion-final" },
      { dayNumber: 23 }, { dayNumber: 24 },
      { dayNumber: 25, className: "Calificaciones-estadia" },
      { dayNumber: 26, className: "Entrega-evaluacion" },
      { dayNumber: 27, className: "Entrega-liberacionE" },
      { dayNumber: 28 },
      { dayNumber: 29, className: "Final-cuatrimestre" },
      { dayNumber: 30 },
      { dayNumber: 31 },
    ],
  },
  {
    name: "Septiembre",
    days: [
      { dayNumber: 1, className: "inicio" },
      { dayNumber: 2 }, { dayNumber: 3 }, { dayNumber: 4 }, { dayNumber: 5 }, { dayNumber: 6 }, { dayNumber: 7 },
      { dayNumber: 8 }, { dayNumber: 9 }, { dayNumber: 10 }, { dayNumber: 11 }, { dayNumber: 12 }, { dayNumber: 13 },
      { dayNumber: 14 }, { dayNumber: 15 },
      { dayNumber: 16, className: "Dias-Festivos" },
      { dayNumber: 17 }, { dayNumber: 18 }, { dayNumber: 19 }, { dayNumber: 20 }, { dayNumber: 21 },
      { dayNumber: 22, className: "parcial" },
      { dayNumber: 23, className: "parcial" },
      { dayNumber: 24, className: "parcial" },
      { dayNumber: 25, className: "parcial" },
      { dayNumber: 26, className: "parcial" },
      { dayNumber: 27 }, { dayNumber: 28 },
      { dayNumber: 29, className: "revaloracion-parcial" },
      { dayNumber: 30, className: "revaloracion-parcial" },
    ],
  },
  {
    name: "Octubre",
    days: [
      { dayNumber: null }, { dayNumber: null },
      { dayNumber: 1, className: "revaloracion-parcial" },
      { dayNumber: 2 }, { dayNumber: 3 }, { dayNumber: 4 }, { dayNumber: 5 }, { dayNumber: 6 }, { dayNumber: 7 },
      { dayNumber: 8 }, { dayNumber: 9 }, { dayNumber: 10 }, { dayNumber: 11 }, { dayNumber: 12 }, { dayNumber: 13 },
      { dayNumber: 14 }, { dayNumber: 15 }, { dayNumber: 16 }, { dayNumber: 17 }, { dayNumber: 18 }, { dayNumber: 19 },
      { dayNumber: 20 }, { dayNumber: 21 }, { dayNumber: 22 }, { dayNumber: 23 }, { dayNumber: 24 }, { dayNumber: 25 },
      { dayNumber: 26 },
      { dayNumber: 27, className: "parcial" },
      { dayNumber: 28, className: "parcial" },
      { dayNumber: 29, className: "parcial" },
      { dayNumber: 30, className: "parcial" },
      { dayNumber: 31, className: "parcial" },
    ],
  },
  {
    name: "Noviembre",
    days: [
      { dayNumber: null }, { dayNumber: null }, { dayNumber: null }, { dayNumber: null }, { dayNumber: null },
      { dayNumber: 1 }, { dayNumber: 2 },
      { dayNumber: 3, className: "revaloracion-parcial" },
      { dayNumber: 4, className: "revaloracion-parcial" },
      { dayNumber: 5, className: "revaloracion-parcial" },
      { dayNumber: 6 }, { dayNumber: 7 }, { dayNumber: 8 }, { dayNumber: 9 }, { dayNumber: 10 },
      { dayNumber: 11 }, { dayNumber: 12 }, { dayNumber: 13 }, { dayNumber: 14 }, { dayNumber: 15 },
      { dayNumber: 16 },
      { dayNumber: 17, className: "Dias-Festivos" },
      { dayNumber: 18 }, { dayNumber: 19 }, { dayNumber: 20 }, { dayNumber: 21 }, { dayNumber: 22 },
      { dayNumber: 23 }, { dayNumber: 24 }, { dayNumber: 25 }, { dayNumber: 26 }, { dayNumber: 27 },
      { dayNumber: 28 }, { dayNumber: 29 }, { dayNumber: 30 },
    ],
  },
  {
    name: "Diciembre",
    days: [
      { dayNumber: 1, className: "parcial" },
      { dayNumber: 2, className: "parcial" },
      { dayNumber: 3, className: "parcial" },
      { dayNumber: 4, className: "parcial" },
      { dayNumber: 5, className: "parcial" },
      { dayNumber: 6 }, { dayNumber: 7 },
      { dayNumber: 8, className: "revaloracion-parcial" },
      { dayNumber: 9, className: "revaloracion-parcial" },
      { dayNumber: 10, className: "revaloracion-parcial" },
      { dayNumber: 11, className: "revaloracion-final" },
      { dayNumber: 12, className: "revaloracion-final" },
      { dayNumber: 13 }, { dayNumber: 14 },
      { dayNumber: 15, className: "Calificaciones-estadia" },
      { dayNumber: 16, className: "Entrega-evaluacion" },
      { dayNumber: 17, className: "Entrega-liberacionE" },
      { dayNumber: 18 },
      { dayNumber: 19, className: "Final-cuatrimestre" },
      { dayNumber: 20 }, { dayNumber: 21 },
      { dayNumber: 22, className: "school-event" },
      { dayNumber: 23, className: "school-event" },
      { dayNumber: 24, className: "school-event" },
      { dayNumber: 25, className: "Dias-Festivos" },
      { dayNumber: 26, className: "school-event" },
      { dayNumber: 27 }, { dayNumber: 28 },
      { dayNumber: 29, className: "school-event" },
      { dayNumber: 30, className: "school-event" },
      { dayNumber: 31, className: "school-event" },
    ],
  },
];

const Legend: React.FC = () => (
  <div className="legends-container">
    {/* Grupo 1: Eventos Académicos */}
    <div className="legend-group legend-academic">
      <div className="legend-group-title">Eventos Académicos</div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Inicio de Cuatrimestre</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Final del Cuatrimestre</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Revaloración Parcial</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Revaloración Final</span>
      </div>
    </div>

    {/* Grupo 2: Entregas y Evaluaciones */}
    <div className="legend-group legend-deliveries">
      <div className="legend-group-title">Entregas y Evaluaciones</div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Calificaciones Estadía</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Entrega de Evaluación</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Liberación de Estadía</span>
      </div>
    </div>

    {/* Grupo 3: Días Especiales */}
    <div className="legend-group legend-special-days">
      <div className="legend-group-title">Días Especiales</div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Días Festivos</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Eventos Escolares</span>
      </div>
      <div className="legend-item">
        <div className="legend-color"></div>
        <span>Vacaciones</span>
      </div>
    </div>
  </div>
);

// Componente para mostrar cada mes
const MonthCalendar: React.FC<{ month: Month }> = ({ month }) => {
  const diasSemana = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="month-calendar">
      <div className="month-header">{month.name}</div>
      <div className="calendar-grid">
        {diasSemana.map((dia) => (
          <div key={dia} className="day-name">
            {dia}
          </div>
        ))}

        {month.days.map(({dayNumber, className }) => {
          const classNames = className ? `calendar-day ${className}` : "calendar-day";

          return (
            <div className={classNames}>
              {dayNumber && <div className="day-number">{dayNumber}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};



const Calendario2025: React.FC = () => {
  return (
    <div>
      <h1>Calendario 2025</h1>
      <Legend />
        <div className="calendar-container">
        {meses.map((month) => (
          <MonthCalendar key={month.name} month={month} />
        ))}
      </div>
    </div>
  );
};


export default Calendario2025;
