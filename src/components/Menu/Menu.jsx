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
                    <span className={styles.icons}><FaHouse /></span>
                    <span>Início</span>
                </Link>
                <Link to="/filmes" className={styles.menuItem}>
                    <span className={styles.icons}><FaFilm /></span>
                    <span>Filmes</span>
                </Link>
                <Link to="/series" className={styles.menuItem}>
                    <span className={styles.icons}><FaTv /></span>
                    <span>Séries</span>
                </Link>

                <select className={styles.select} name="categories" id="categories">
                    <option value="categories">Categorias</option>
                    <option value="action">Ação</option>
                    <option value="comedy">Comédia</option>
                    <option value="drama">Drama</option>
                    <option value="suspense">Suspense</option>
                </select>

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
