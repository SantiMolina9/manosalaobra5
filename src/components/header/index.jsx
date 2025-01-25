import BurguerMenu from "../BurguerMenu";
import Title from '../title/index.jsx';
import Logo from '../Logo/Logo.jsx'
import { useTheme } from "../../context/theme-context.jsx";
import { headerVariants } from "../../utlis/framerVariants";
import { motion } from "framer-motion";
import '../header/index.scss';

function Header({ nombre }) {

    const { theme, toggleTheme } = useTheme();
    
    return (
        <motion.div 
            className="header"
            variants={headerVariants}
            initial="hidden" 
            animate="visible" 
        >
            <div className="header-left">
                <BurguerMenu />
                <Logo size="40" />
            </div>
            <Title nombre={nombre} />
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={`Cambiar a modo ${theme === "light" ? "oscuro" : "claro"}`}
            >
                {theme === "light" ? "☀️" : "🌙"}
            </button>
        </motion.div>
    );
}

export default Header;
