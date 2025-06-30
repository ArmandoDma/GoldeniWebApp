import axios from "axios";
import { useState } from "react";

export interface AsistenciaToken {
  token: string;
  createdAt: string;
  expiresAt: string;
  isActive: boolean;
}

export const useTokenGenerator = () => {
  const [tokenInfo, setTokenInfo] = useState<AsistenciaToken | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generarToken = async (numeroEmpleado: string) => {
    try {
      const jwt = localStorage.getItem("token");
      if (!jwt) throw new Error("No JWT found en localStorage");

      const response = await axios.post(
        "http://localhost:5270/api/AsistenciaToken/generar",
        { numeroEmpleado },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTokenInfo(response.data); // Guarda todo el objeto
      setError(null);
      return true;
    } catch (err: any) {
      setError(err.message || "Error al generar token");
      setTokenInfo(null);
      return false;
    }
  };

  return { tokenInfo, error, generarToken };
};
