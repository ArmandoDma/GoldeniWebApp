import type { Route } from "../../+types/root";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const Workshops = () => {
  return (
    <div>Workshops</div>
  )
}

export default Workshops;
