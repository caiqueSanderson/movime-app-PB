import { useState, useEffect } from "react";
import { restoredTheme } from "./themeUtils";

import styles from "./styles.module.css";

import Menu from "../../components/Menu/Menu";

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
                    <h2 className={styles.slogan}>Aproveite cada momento</h2>
                    <p className={styles.subtitle}>Conosco suas férias se tornam mágicas</p>
                </div>
                <div className={styles.search}>
                    <select
                        name="filter"
                        id="filter"
                        // value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className={styles.filter}>
                        <option value="filter">Ordenar por:</option>
                        <option value="lowestPrice">Menor Preço</option>
                        <option value="highestPrice">Maior Preço</option>
                        <option value="highestRating">Maior Avaliação</option>
                        <option value="lowestRating">Menor Avaliação</option>
                    </select>
                    <input
                        type="search"
                        placeholder="Encontre o hotel dos sonhos"
                        // value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="submit">Buscar</button>
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
        </div>
    )
}