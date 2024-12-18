import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getGenres } from "../../services/genreMovies";
import { restoredTheme } from "../../services/theme";
import axios from "axios";

import { FaAngleLeft } from "react-icons/fa";
import styles from "./styles.module.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLightTheme, setIsLigthTheme] = useState(true);

  const [dataMovie, setDataMovie] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  function navigateHome() {
    navigate("/");
  }

  async function restoreData() {
    try {
      const token = localStorage.getItem("@VITE_PRIVATE_TOKEN");

      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setDataMovie(response.data);
      } else {
        console.error(`Filme com id ${id} não encontrado.`);
      }
    } catch (error) {
      console.error("Erro ao carregar detalhes do filme", error);
    }
  }

  useEffect(() => {
    restoreData();
    (async () => {
      const genres = await getGenres();
      setGenreMap(genres);
    })();
  }, [id]);

  useEffect(() => {
    restoredTheme(setIsLigthTheme);
  }, []);

  if (!dataMovie) {
    return (
      <div
        className={`${styles.loading} ${
          isLightTheme ? styles.lightTheme : styles.darkTheme
        }`}
      >
        <p>Carregando...</p>
      </div>
    );
  }

  const genreNames = dataMovie.genres
    ? dataMovie.genres
        .map((genre) => genreMap[genre.id] || genre.name)
        .join(", ")
    : "Gêneros não disponíveis";

  return (
    <div
      className={`${styles.page} ${
        isLightTheme ? styles.lightTheme : styles.darkTheme
      }`}
    >
      <div className={styles.returnSection}>
        <button onClick={navigateHome} className={styles.returnButton}>
          <FaAngleLeft /> Retornar
        </button>
      </div>

      <div
        className={`${styles.imageSection} ${
          isLightTheme ? styles.sectionLight : styles.sectionDark
        }`}
      >
        <img
          className={styles.backdrop}
          src={`https://image.tmdb.org/t/p/original${dataMovie.backdrop_path}`}
          alt={dataMovie.title}
        />
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500${dataMovie.poster_path}`}
          alt={dataMovie.title}
        />
      </div>

      <div
        className={`${styles.infoSection} ${
          isLightTheme ? styles.sectionLight : styles.sectionDark
        }`}
      >
        <h1 className={styles.title}>{dataMovie.title}</h1>
        <p>
          <strong>Título original:</strong> {dataMovie.original_title}
        </p>
        <p>
          <strong>Língua original:</strong> {dataMovie.original_language}
        </p>
        <p>
          <strong>Gêneros:</strong> {genreNames}
        </p>
        <p>
          <strong>Popularidade:</strong> {dataMovie.popularity.toFixed(1)}
        </p>
        <p>
          <strong>Duração:</strong> {dataMovie.runtime} minutos
        </p>
        <p>
          <strong>Lançamento:</strong> {dataMovie.release_date}
        </p>
      </div>
      <div
        className={`${styles.descriptionSection} ${
          isLightTheme ? styles.sectionLight : styles.sectionDark
        }`}
      >
        <h2>Sinopse</h2>
        <p className={styles.description}>
          {dataMovie.overview || "Descrição não disponível."}
        </p>
      </div>
    </div>
  );
}
