import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import '../BurguerMenu/index.scss'
const BurguerMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        const mainContent = document.querySelector(".main-content");
    if (mainContent) {
        if (!menuOpen) {
        mainContent.classList.add("blur");
        } else {
        mainContent.classList.remove("blur");
        }
    }
}

    return (
        <div className="menu-burguer">
            <div
                className={`overlay ${menuOpen ? "is-active" : ""}`}
                onClick={toggleMenu}
            />
            {menuOpen ? (
                <div className="back-arrow-box" onClick={toggleMenu}>
                    <span className="back-arrow">‹</span>
                </div>
            ) : (
                <div className={`hamburger ${menuOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
                    <div>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div>
            )}
            <nav className={`menulateral ${menuOpen ? 'is_active' : ''}`}>
                <div className='logo-app'>
                    <Logo size="60"/>
                    <span>PROJECTS APP</span>
                </div>
                <ul className="nav-links">
                    <Link to={"/"} className="nav-link">HOME</Link>
                    <Link to={"/my-projects"} className="nav-link">PROJECTS</Link>
                    <Link to={"/my-stories"} className="nav-link">STORIES</Link>
                    <Link to={"/settings"} className="nav-link" id="nav-settings">SETTINGS</Link>
                </ul>
            </nav>
        </div>
    )
}
export default BurguerMenu;