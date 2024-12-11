import { Navigate } from "react-router-dom";
import Header from "../../components/header";
import "../settings/index.scss"
import { useState } from "react";
function Settings(){
    const [isLoggedOut, setIsLoggedOut] = useState(false); 
    const handleButton = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');  
            localStorage.removeItem('userID'); 
            setIsLoggedOut(true);  
        }
    };

    if (isLoggedOut) {
        return <Navigate to="/login" replace />;
    }
    return(
        <div>
            <Header nombre = 'SETTINGS'/>
            <button className = "logout" type = "button" onClick = {handleButton}>Cerrar Sesion</button>
        </div>
    )
}

export default Settings;