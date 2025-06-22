import { useEffect, useState } from "react";
import type { Route } from "../../+types/root";
import { Loader } from "~/Components/Loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Goldeni - Private Collage" },
    { name: "description", content: "" },   
  ];
}

const Courses = () => {
  const [loading, setLoading] = useState(true);
    useEffect(() => {
      setLoading(false)
    }, [])
  
    if(loading) return <Loader />
  return (
    <div>Courses</div>
  )
}


export default Courses;