import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { Loader } from "./Loader";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {    
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        
        setIsAuthenticated(true);
      }
    }
    setAuthChecked(true);
  }, []);

  if (!authChecked) {    
    return <Loader />; // o spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }  
  return <>{children}</>;
};

export default RequireAuth;
