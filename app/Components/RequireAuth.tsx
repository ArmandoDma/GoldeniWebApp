import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Loader } from "./Loader";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
  IdRol: string;
}

const RequireAuth = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const storedRole = localStorage.getItem("rol");

      if (token && storedRole) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          const now = Math.floor(Date.now() / 1000);

          if (decoded.exp < now) {
            // Token expirado
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            setIsAuthenticated(false);
            setRole(storedRole); // Conservamos el rol para saber a qué login ir
          } else {
            setIsAuthenticated(true);
            setRole(storedRole.toString());
          }
        } catch (error) {
          console.error("Token inválido:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
          setIsAuthenticated(false);
          setRole(storedRole);
        }
      } else {
        setIsAuthenticated(false);
        setRole(storedRole); // Puede no estar, pero lo intentamos
      }
    }

    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <Loader />;
  }

  if (!isAuthenticated) {    
    const loginPath = role === "3" || role === "Admin" ? "/admin/login" : "/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    let redirectPath = "/";

    switch (role) {
      case "1":
      case "Estudiante":
        redirectPath = "/students/portal";
        break;
      case "2":
      case "Docente":
        redirectPath = "/teachers/portal";
        break;
      case "3":
      case "Admin":
        redirectPath = "/admin/portal";
        break;
      default:
        redirectPath = "/login";
    }

    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
