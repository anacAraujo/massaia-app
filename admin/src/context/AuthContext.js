import axios from "../lib/AxiosConfig";
import { useState, useEffect, createContext } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    )
    const navigate = useNavigate();

    const login = async (inputs) => {
        try {
            const res = await axios.post("/auth/login", inputs);
            setCurrentUser(res.data);
        } catch (error) {
            console.error(error.response.data);
        }
    }

    const logout = async (inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null);
    }

    const CheckTokenValidation = () => {
        if (currentUser && currentUser.token) {
            const decodeToken = jwtDecode(currentUser.token);
            const currentTime = Date.now() / 1000;
            if (decodeToken.exp < currentTime) {
                setCurrentUser(null);
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        CheckTokenValidation();
        const interval = setInterval(CheckTokenValidation, 60000);
        return () => clearInterval(interval);
    }, [currentUser]);

    return(
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}