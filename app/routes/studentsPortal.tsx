import Carousel from "~/Components/Carousel";
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
    <Carousel />
    </>
  )
}
