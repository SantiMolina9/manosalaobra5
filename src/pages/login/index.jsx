import './index.scss';
import Logo from '../../components/Logo/Logo';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { formVariants, itemFormVariants} from '../../utlis/framerVariants';
import { motion } from 'framer-motion';
import Title from '../../components/title';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        fetch("https://pweb-api-c0rq.onrender.com/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then((response) => {
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userID', response.data.user._id); 
                navigate('/');
            } else {
                alert('Usuario o contraseña incorrectos');
            }
        })
        .catch(err => {
            console.log(err);
            alert('Ocurrió un error en el servidor');
        });
    };

    return (
        <>
            <motion.div 
                className="header"
                initial="hidden" 
                animate="visible"
                variants={{
                    hidden: { opacity: 0, y: -50 },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
                }}
            >
                <Logo size="60" />
                <Title nombre="Login" />
            </motion.div>
            <div className="box-login">
                <motion.form 
                    className="form-login" 
                    onSubmit={handleSubmit(onSubmit)}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 
                        className="login-title" 
                        variants={itemFormVariants}
                    >
                        Bienvenido a Project App
                    </motion.h2>
                    <motion.p 
                        className="login-subtitle" 
                        variants={itemFormVariants}
                    >
                        Inicia sesión para continuar
                    </motion.p>

                    <motion.div className="input-group" variants={itemFormVariants}>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register('username', { required: 'El username es obligatorio' })}
                            className={`input-field ${errors.username ? 'input-error' : ''}`}
                        />
                        {errors.username && <p className="error-message">{errors.username.message}</p>}
                    </motion.div>

                    <motion.div className="input-group" variants={itemFormVariants}>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'La contraseña es obligatoria' })}
                            className={`input-field ${errors.password ? 'input-error' : ''}`}
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}
                    </motion.div>

                    <motion.button 
                        type="submit" 
                        className="btn-login" 
                        variants={itemFormVariants}
                    >
                        Iniciar sesión
                    </motion.button>
                    <motion.div 
                        className='login-links'
                        variants={itemFormVariants}
                    >
                        <Link to="/register" className='register-link'>
                            Registrarse
                        </Link>
                    </motion.div>
                </motion.form>
            </div>
        </>
    );
}

export default Login;
