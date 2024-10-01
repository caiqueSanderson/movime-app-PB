import styles from "./styles.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHouse, FaFilm, FaTv, FaMoon } from "react-icons/fa6";

export default function Menu(props) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <span>Movime</span>
            </div>

            <nav className={`${styles.menu} ${isMenuOpen ? styles.show : ""}`}>
                <Link to="/" className={styles.menuItem}>
                    <span><FaHouse /></span>
                    <span>Início</span>
                </Link>
                <Link to="/filmes" className={styles.menuItem}>
                    <span><FaFilm /></span>
                    Filmes
                </Link>
                <Link to="/series" className={styles.menuItem}>
                    <span><FaTv /></span>
                    Séries
                </Link>
                <Link to="/favoritos" className={styles.menuItem}>
                    Favoritos
                </Link>
                <span className={styles.menuItem} onClick={props.toggleTheme}>
                    <FaMoon />
                </span>
            </nav>

            <div className={styles.menuToggle} onClick={toggleMenu}>
                ☰
            </div>
        </header>
    );
}
