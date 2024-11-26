import { useState, useEffect } from "react";
import axios from "axios";

import styles from "./styles.module.css";

import Menu from "../../components/Menu/Menu";
import Authentication from "../../components/Authentication/Authentication";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

const token = import.meta.env.VITE_PRIVATE_TOKEN;

export default function Home() {
    const [isLightTheme, setIsLigthTheme] = useState(true);
    const [dataMovies, setDataMovies] = useState({ results: [] });
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");

    function toggleTheme() {
        const themeNow = !isLightTheme;
        setIsLigthTheme(themeNow);
        localStorage.setItem("@theme", themeNow ? "true" : "false");
    }

    async function restoreData() {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1`,
                {
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data && response.data.results) {
                setDataMovies(response.data);
                setFiltered(response.data.results);
            } else {
                console.error("A resposta da API não contém 'results'.", response);
            }
        } catch (error) {
            console.error("Erro ao carregar DB", error);
        }
    }

    useEffect(() => {
        if (search.trim() === "") {
            setFiltered(dataMovies.results);
        } else {
            const filteredData = dataMovies.results.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
            setFiltered(filteredData);
        }
    }, [search, dataMovies.results]);
    useEffect(() => {
        restoreData();
    }, []);

    return (
        <div className={isLightTheme ? styles.ligthTheme : styles.darkTheme}>
            <Menu toggleTheme={toggleTheme} />

            <section className={styles.welcome}>
                <div className={styles.text}>
                    <h2 className={styles.slogan}>Aproveite cada segundo</h2>
                    <p className={styles.subtitle}>Conosco seus momentos se tornam mágicos</p>
                </div>

                <div className={styles.search}>
                    <input
                        type="search"
                        placeholder="Faça sua busca"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button type="button" onClick={() => setSearch(search)}>Buscar</button>
                </div>
            </section>

            <section className={styles.movies}>
                <h2 className={styles.typographySection}>Filmes</h2>
                <div className={styles.cards}>
                    {filtered.length > 0 ? (
                        filtered.map((movie) => (
                            <Card
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={movie.poster_path}
                            />
                        ))
                    ) : (
                        <>
                            <p>{dataMovies.results.length === 0 ? "Carregando filmes..." : "Nenhum filme encontrado."}</p>
                            {dataMovies.results.length === 0 && <Loading />}
                        </>
                    )}
                </div>
            </section>

            <Authentication />
        </div>
    );
}
