import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Loader } from "./Loader";

const Authenticated = ({ children }: { children: React.ReactNode }) => {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("rol");

    if (token) {
      setIsAuthenticated(true);
      setRole(savedRole);
    }

    setAuthChecked(true);
  }, []);

  if (!authChecked) return <Loader />;

  if (isAuthenticated) {
    const path = role === "2" ? "/teachers/portal" : "/students/portal";
    return <Navigate to={path} replace />;
  }

  return <>{children}</>;
};

export default Authenticated;