import React, { useEffect, useState } from "react";
import { authenticateAndGetAccountData } from "./autentication";

import styles from "./styles.module.css";

export default function Statistics() {
    const [sessionData, setSessionData] = useState(null);

    useEffect(() => {
        async function fetchSessionData() {
            try {
                const { sessionId, accountId } = await authenticateAndGetAccountData();
                console.log("Sessão:", sessionId);
                console.log("Account ID:", accountId);
                setSessionData({ sessionId, accountId });
            } catch (error) {
                console.error("Erro ao obter os dados de sessão e conta:", error);
            }
        }

        fetchSessionData();
    }, []);

    return (
        <div className={styles.container}>
            <h1>Autenticação TMDB</h1>
            {sessionData ? (
                <div>
                    <p>Session ID: {sessionData.sessionId}</p>
                    <p>Account ID: {sessionData.accountId}</p>
                </div>
            ) : (
                <div className={styles.containerLoading}>
                    <p>Autenticando...</p>
                <span className={styles.loading}></span>
                </div>
            )}
        </div>
    );
}
