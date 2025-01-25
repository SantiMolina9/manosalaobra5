import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/theme-context.jsx";
import {motion} from 'framer-motion'
import '../HeaderBack/index.scss'
import Logo from "../Logo/Logo.jsx";

function HeaderBack({titulo}){

    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const headerVariants = {
        hidden: {
            opacity: 0,
            y: -50, // Posición inicial por encima de la pantalla
        },
        visible: {
            opacity: 1,
            y: 0, // Posición final en su lugar original
            transition: {
                duration: 0.8, // Duración de la animación
                ease: "easeOut", // Transición suave
            },
        },
    }
    return (
        <motion.div 
            className = "header"
            variants={headerVariants}
            initial="hidden" 
            animate="visible"
            >
            <button className = "boton-atras" onClick={() => navigate(-1)}>
                ‹
            </button>
            <h1 className ="title">{titulo}</h1>
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            >
                {theme === "light" ? "☀️" : "🌙"}
            </button>
        </motion.div>
    )
}

export default HeaderBack;