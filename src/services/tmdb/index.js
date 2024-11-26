import axios from "axios";

const token = import.meta.env.VITE_PRIVATE_TOKEN;
const sessionId = localStorage.getItem("@sessionID");
const accountId = localStorage.getItem("@accountID");

console.log(sessionId, accountId)

export async function getRatedMovies() {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/account/${accountId}/rated/movies?language=pt-BR&page=1&session_id=${sessionId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data.results;
    } catch (error) {
        console.error("Erro ao buscar filmes avaliados", error);
        throw error;
    }
}
