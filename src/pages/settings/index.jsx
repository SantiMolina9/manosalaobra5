import { Navigate } from "react-router-dom";
import Header from "../../components/header";
import "../settings/index.scss";
import { useEffect, useState } from "react";
import { api, endpoints } from '../../utlis/apiService';
import CargandoComponent from "../../components/CargandoComponent";

function Settings() {
    const [isLoggedOut, setIsLoggedOut] = useState(false); 
    const [isLoading, setIsLoading] = useState(true); 
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            localStorage.removeItem('token');  
            localStorage.removeItem('userID'); 
            setIsLoggedOut(true);  
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedOut(true); // Si no hay token, redirigir al login
            return;
        }

        const userID = localStorage.getItem('userID');
        const fetchUser = async () => {
            try {
                const response = await api.get(endpoints.user(userID));
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                setError('No se pudo cargar la información del usuario.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (isLoggedOut) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <Header nombre="SETTINGS" />
            <div className="main-content-settings">
                {isLoading ? (
                    <CargandoComponent />
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : (
                    user && (
                        <div className="user-info">
                            <h2>Información del Usuario</h2>
                            <p><strong>Nombre de Usuario:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    )
                )}
                <button 
                    className="logout" 
                    type="button" 
                    onClick={handleLogout}
                    aria-label="Cerrar sesión"
                >
                    Cerrar Sesión
                </button>
            </div>
        </>
    );
}

export default Settings;
