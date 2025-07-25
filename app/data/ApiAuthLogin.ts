
import ApiClient from "~/hooks/ApiClient";

interface ApiLogin {
  email: string;
  password: string;
  IdRol: number;
}

export const ApiAuthLogin = async (params: ApiLogin): Promise<any> => {
  console.log("🔍 Enviando a login:", params);
  const response = await ApiClient.post("/Auth/login", params);
  const data = response.data;

  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data;
};
