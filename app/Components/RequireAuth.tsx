import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Loader } from "./Loader";

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
        setIsAuthenticated(true);
        setRole(storedRole);
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
    
    const redirectPath = role === "Estudiante" ? "/students/portal" : "/teachers/portal";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
