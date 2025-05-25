import type { Route } from "./+types/home";
import { Navigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

export default function home() {
  return <Navigate to={"/login"} replace />;
}
