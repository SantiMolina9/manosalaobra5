import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../utlis/apiService';
import { GenericFormService } from '../../utlis/genericFormService';

import './index.scss';

function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const userService = new GenericFormService('user', api);

    // Obtenemos el valor de la contraseña para validarla
    const password = watch('password');

    const onSubmit = async (data) => {
        try {
            await userService.handleSubmit(data, null, null);
            navigate('/login');
        } catch (error) {
            console.error('Error submitting user:', error);
        }
    };

    return (
        <motion.div 
            className="register-container"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
            }}
        >
            <motion.form 
                className="form-register" 
                onSubmit={handleSubmit(onSubmit)}
                initial="hidden"
                animate="visible"
            >
                <motion.h2 
                    className="register-title" 
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
                >
                    Crea tu cuenta!
                </motion.h2>

                <motion.div className="input-group" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        {...register('username', { required: 'El nombre de usuario es obligatorio' })}
                        className={`input-field ${errors.username ? 'input-error' : ''}`}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </motion.div>

                <motion.div className="input-group" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        {...register('email', { required: 'El correo electrónico es obligatorio' })}
                        className={`input-field ${errors.email ? 'input-error' : ''}`}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </motion.div>

                <motion.div className="input-group" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        {...register('password', { required: 'La contraseña es obligatoria' })}
                        className={`input-field ${errors.password ? 'input-error' : ''}`}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </motion.div>

                <motion.div className="input-group" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}>
                    <input
                        type="password"
                        placeholder="Confirma tu contraseña"
                        {...register('confirmPassword', {
                            required: 'La confirmación es obligatoria',
                            validate: (value) => value === password || 'Las contraseñas no coinciden',
                        })}
                        className={`input-field ${errors.confirmPassword ? 'input-error' : ''}`}
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
                </motion.div>

                <motion.button 
                    type="submit" 
                    className="btn-register" 
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } }}
                >
                    Registrarse
                </motion.button>
            </motion.form>
        </motion.div>
    );
}

export default Register;
