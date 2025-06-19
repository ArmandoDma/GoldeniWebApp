import { useEffect } from "react";
import type { Route } from "./+types/home";
import { useNavigate } from "react-router";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

export default function home() {

  const nav = useNavigate();

  useEffect(() => {
    nav("/login", {replace: true})
  }, [])
  
  return null;
}
