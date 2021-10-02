// src/services/AuthenService.js
import axios from 'axios';
const AUTHEN_API = "https://localhost:44325/api/authen/";

const login = (username, password) => {
    return axios.post(AUTHEN_API + "login", { username, password })
        .then(response => {
            //status 200
            if (response.data.success === true) {
                console.log("SUCESS AND SET LOCALSTORAGE")
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data;
        });
        
}

const register = (data) => {

}

const logout = () => {
    localStorage.removeItem("user");
}
export const AuthenService = {
    login, logout, register
}

