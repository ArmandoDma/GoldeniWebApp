import Portal from "~/Views/Portal";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

export default function StudentsPortal () {
  return (
    <>
    <Portal />
    </>
  )
}
