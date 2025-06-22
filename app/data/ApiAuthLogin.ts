import axios, { type AxiosResponse } from "axios"

interface ApiLogin{
    email: string;
    password: string;
    IdRol: number;
}

export const ApiAuthLogin = async (params: ApiLogin): Promise<AxiosResponse> => {
    const response = await axios.post("http://localhost:5270/api/Auth/login", params)
    const data = response.data;

    if(data.token){
        localStorage.setItem("token" , data.token);
    }

    return data;
}
