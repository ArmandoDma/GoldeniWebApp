import { useState } from "react";
import type { Route } from "../../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const attendanceRecords = [
  { date: "2025-05-18", status: "Asistió" },
  { date: "2025-05-19", status: "Faltó" },
  { date: "2025-05-20", status: "Justificado" },
  { date: "2025-05-21", status: "Asistió" },
  { date: "2025-05-22", status: "Faltó" },
];

const statusColors = {
  "Asistió": "green",
  "Faltó": "red",
  "Justificado": "orange",
};

const Attend = () => {
  
  return (
    <>
     <div style={styles.container}>
      <h1>Historial de Asistencias</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map(({ date, status }) => (
            <tr key={date}>
              <td>{new Date(date).toLocaleDateString()}</td>
              <td style={{ color: statusColors[status], fontWeight: "bold" }}>
                {status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #eee",
    padding: "8px",
  },
};



export default Attend;