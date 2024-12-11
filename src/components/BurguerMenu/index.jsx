import { useState } from "react";
import { Link } from "react-router-dom";
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
        <div className = "menu-burguer">
             {/* Overlay */}
      <div
        className={`overlay ${menuOpen ? "is-active" : ""}`}
        onClick={toggleMenu}
      ></div>
        {menuOpen ? (
            <div className="back-arrow" onClick={toggleMenu}>
            ‹
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
            <nav className = {`menulateral ${menuOpen ? 'is_active' : ''}`}>
				<div className = 'logo-app'>
					PROJECTS APP
				</div>
                <ul className="nav-links">
                <Link to = {"/"} className="nav-link">HOME</Link>
                <Link to = {"/my-projects"} className="nav-link">PROJECTS</Link>
                <Link to = {"/my-stories"} className="nav-link">STORIES</Link>
                <Link to = {"/settings"} className= "nav-link" id = "nav-settings">SETTINGS</Link>
                </ul>
            </nav>
        </div>
    )
}
export default BurguerMenu;