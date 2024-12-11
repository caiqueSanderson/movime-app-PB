import axios from "axios";

const API_KEY = localStorage.getItem("VITE_PRIVATE_API_KEY");
const url = "https://api.themoviedb.org/3";

export async function getGenres() {
    try {
        const response = await axios.get(`${url}/genre/movie/list`, {
            params: {
                api_key: API_KEY,
                language: "pt-BR",
            },
        });

        const genresMap = response.data.genres.reduce((map, genre) => {
            map[genre.id] = genre.name;
            return map;
        }, {});
        
        return genresMap;
    } catch (error) {
        console.error("Erro ao obter os gêneros:", error.message);
    }
};
