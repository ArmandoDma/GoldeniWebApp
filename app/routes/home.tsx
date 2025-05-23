import { LoginPage } from "~/login/LoginPage";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },
  ];
}

export default function Login() {
  return <LoginPage />;
}
