import type { Route } from "../../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const Schedule = () => {
  return (
    <div>Schedule</div>
  )
}

export default Schedule;