
import Portal from "~/Views/Teachers/Portal";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

export default function TeachersPortal ()  {
  return (
    <>
    <Portal />
    </>
  )
}
