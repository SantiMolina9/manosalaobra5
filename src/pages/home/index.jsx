import Header from "../../components/header";
import Footer from '../../components/Footer';
import './index.scss';
import { motion } from 'framer-motion';

function Home() {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 }, // Elemento está oculto y desplazado hacia abajo
        visible: {
            opacity: 1,
            y: 0, // Elemento visible y en su posición final
            transition: {
                duration: 0.8, // Animación más lenta
                ease: "easeInOut", // Suavidad en la entrada y salida
            },
        },
    };

    const h1Variants = {
        hidden: {
            opacity: 0,
            y: -50, // Posición inicial por encima de la pantalla
        },
        visible: {
            opacity: 1,
            y: 0, // Posición final en su lugar original
            transition: {
                duration: 1.2, // Más duración para el h1
                ease: "easeOut", // Transición suave
            },
        },
    };

    const containerVariants = {
        hidden: { opacity: 0 }, // Estado inicial de los elementos
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4, // Cascada más rápida
                delayChildren: 0.2, // Pequeño retraso antes de iniciar
            },
        },
    };

    // Animación independiente para la imagen
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8 }, // Imagen inicial más pequeña y opaca
        visible: {
            opacity: 1,
            scale: 1, // Imagen en tamaño real
            transition: {
                duration: 1.5, // Duración más larga
                ease: "easeInOut", // Efecto de entrada y salida suave
            },
        },
    };

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
                    <motion.h1 variants={h1Variants}>
                        Gestiona tus proyectos de forma simple
                    </motion.h1>
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
