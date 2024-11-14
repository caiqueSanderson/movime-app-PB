import axios from "axios";

const apiKey = import.meta.env.VITE_PRIVATE_API_KEY;

async function createRequestToken() {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
        );
        return response.data.request_token;
    } catch (error) {
        console.error("Erro ao gerar token de requisição:", error);
        throw error;
    }
}

async function createSession(requestToken) {
    try {
        const response = await axios.post(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
            { request_token: requestToken }
        );
        return response.data.session_id;
    } catch (error) {
        console.error("Erro ao criar sessão:", error);
        throw error;
    }
}

async function getAccountId(sessionId) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${sessionId}`
        );
        return response.data.id;
    } catch (error) {
        console.error("Erro ao obter Account ID:", error);
        throw error;
    }
}

// Função de autenticação modificada para fornecer o link de autenticação separadamente
export async function authenticateAndGetAccountData() {
    try {
        // Primeira etapa: obtenha o requestToken e o link de autenticação
        const requestToken = await createRequestToken();
        const authenticationLink = `https://www.themoviedb.org/authenticate/${requestToken}`;

        // Retorne o link de autenticação para o usuário
        return { requestToken, authenticationLink };
    } catch (error) {
        console.error("Erro no processo de autenticação:", error);
        throw error;
    }
}

// Função para prosseguir com a criação da sessão após a autenticação
export async function completeAuthentication(requestToken) {
    try {
        const sessionId = await createSession(requestToken);
        const accountId = await getAccountId(sessionId);
        return { sessionId, accountId };
    } catch (error) {
        console.error("Erro ao completar a autenticação:", error);
        throw error;
    }
}
