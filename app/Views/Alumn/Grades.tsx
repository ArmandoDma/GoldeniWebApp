import { Loader } from "~/Components/Loader";
import type { Route } from "../../+types/root";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const Grades = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />
  return (
    <div>Grades</div>
  )
}

export default Grades;