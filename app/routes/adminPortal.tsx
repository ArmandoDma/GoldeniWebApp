import Portal from "~/Views/Admin/Portal";
import type { Route } from "./+types/home"; 

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Admin Portal" },
    { name: "description", content: "Panel de administración de Goldeni." },   
  ];
}

export default function AdminPortalPage() {
  return (
    <>
      <Portal />
    </>
  );
}
