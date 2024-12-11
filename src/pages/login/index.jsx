import './index.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/title';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el error
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        
        fetch("http://localhost:3000/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((data) => {
            if (data.data && data.data.token) {
                // Guardar el token y el userID en localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('userID', data.data.user._id);
                
                // Redirigir a la ruta raíz
                navigate('/');
            } else {
                // Si no hay token, mostrar mensaje de error
                setErrorMessage('Usuario o contraseña incorrectos');
            }
        })
        .catch(err => {
            console.log(err);
            setErrorMessage('Ocurrió un error en el servidor');
        });
    };

    return (
        <>
        <div className="header">
            <Title nombre={"Login"} />
        </div>
        <div className="box-login">
            <form className="form-login" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="input-field"
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input-field"
                />
                <button type="submit" className="btn-login">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Mostrar el error si existe */}
        </div>
        </>
    );
}

export default Login;
