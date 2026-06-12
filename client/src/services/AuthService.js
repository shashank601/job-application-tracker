import api from "./Axios.js";
import { clearToken } from "../utils/Token.js";

export const Login = async ({email, password}) => {
    const credentials = {email, password};
    console.log(credentials);
    const response = await api.post('/auth/login', credentials); 
    return response.data;
}


export const Register = async ({username, email, password}) => { 
    const credentials = {name: username, email, password};
    const response = await api.post('/auth/register', credentials); 
    return response.data;
}

export const Logout = () => {
    return clearToken(); 
}