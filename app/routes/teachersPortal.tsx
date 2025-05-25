import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

export default function TeachersPortal ()  {
  return (
    <div>TeacherPortal</div>
  )
}
