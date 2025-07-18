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

          const now = Math.floor(Date.now() / 1000); // segundos

          if (decoded.exp < now) {
            // Token expirado: limpia y bloquea
            localStorage.removeItem("token");
            localStorage.removeItem("rol");
            setIsAuthenticated(false);
            setRole(null);
          } else {
            setIsAuthenticated(true);
            setRole(storedRole);
          }
        } catch (error) {
          console.error("Token inválido:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
          setIsAuthenticated(false);
        }
      }
    }
    setAuthChecked(true);
  }, []);

  if (!authChecked) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && !allowedRoles.includes(role)) {
    const redirectPath =
      role === "Estudiante" ? "/students/portal" : "/teachers/portal";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
