import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload del token
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        return payload.exp < currentTime; // Verifica si el token ha expirado
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Si hay un error, tratamos el token como expirado
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token || token === 'null' || isTokenExpired(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

