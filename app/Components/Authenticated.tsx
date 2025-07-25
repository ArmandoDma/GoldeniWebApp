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
    let path = "/students/portal"; // default

    if (role === "2") path = "/teachers/portal";
    else if (role === "3") path = "/admin/portal";

    return <Navigate to={path} replace />;
  }

  return <>{children}</>;
};

export default Authenticated;
