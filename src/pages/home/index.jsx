import Header from "../../components/header";
import Footer from '../../components/Footer';
import './index.scss';
import { useEffect, useState } from "react";
import {api, endpoints} from '../../utlis/apiService';
import { containerVariants, itemVariants, imageVariants, h1Variants } from "../../utlis/framerVariants";
import { motion } from 'framer-motion';

function Home() {
    const [user, setUser] = useState({});

    useEffect(() => {
            const userID = localStorage.getItem('userID');

            const fetchUser = async () => {
                try {
                    const response = await api.get(endpoints.user(userID));
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setError('No se pudo cargar la información del usuario.');
                }
            };
    
            fetchUser();
        }, []);

    return (
        <div className="home-container">
            <Header nombre="HOME" />
            <main className="main-content">
                <motion.div 
                    className="welcome-section"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h1 variants={h1Variants}>¡Bienvenido {user.username}!</motion.h1>
                    <motion.h2 variants={h1Variants}>
                        Gestiona tus proyectos de forma simple
                    </motion.h2>
                    <motion.p 
                        className="description"
                        variants={itemVariants}
                    >
                        Una herramienta intuitiva para organizar tus proyectos, épicas e historias de usuario.
                        Mantén el control de tus tareas y alcanza tus objetivos de manera eficiente.
                    </motion.p>
                </motion.div>
                <motion.img 
                    src="/assets/home.png"
                    alt="Gestión de proyectos"
                    className="project-management-image"
                    variants={imageVariants} // Nueva animación para la imagen
                    initial="hidden"
                    animate="visible"
                />
            </main>
            <Footer />
        </div>
    );
}

export default Home;
