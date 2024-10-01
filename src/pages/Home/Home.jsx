import { useState, useEffect } from "react";
import { FaAnglesRight } from "react-icons/fa6";
import { restoredTheme } from "./themeUtils";

import styles from "./styles.module.css";

import Menu from "../../components/Menu/Menu";
import Card from "../../components/Card/Card";

export default function Home() {
    const [isLightTheme, setIsLigthTheme] = useState(true);

    function toggleTheme() {
        const themeNow = !isLightTheme;
        setIsLigthTheme(themeNow);
        localStorage.setItem("@theme", themeNow ? "true" : "false");
    };

    useEffect(() => {
        restoredTheme(setIsLigthTheme);
    }, []);

    return (
        <div className={isLightTheme ? styles.ligthTheme : styles.darkTheme}>
            <Menu toggleTheme={toggleTheme} />
            <section className={styles.welcome}>
                <div className={styles.text}>
                    <h2 className={styles.slogan}>Aproveite cada segundo</h2>
                    <p className={styles.subtitle}>Conosco seus momentos se tornam mágicas</p>
                </div>

            </section>
            {/* <div className={styles.cards}>
                {moviesFiltered.map(
                    (movie) => (
                        <Card key={movie.id} />
                    )
                )
                }
            </div> */}

            {/* <Footer isLightTheme={isLightTheme} /> */}
            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Filmes</h2>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                    <FaAnglesRight />
                </div>
            </section>

            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Séries</h2>
                <div className={styles.cards}>
                    <Card />
                    <Card />
                    <FaAnglesRight />
                </div>
            </section>
        </div>
    )
}