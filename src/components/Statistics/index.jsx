import styles from "./styles.module.css";

export default function Statistics({ totalHours, topGenres }) {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statItem}>
                <h3>Total de Horas Assistidas</h3>
                <p>{totalHours} horas</p>
            </div>
            <div className={styles.statItem}>
                <h3>Top 5 Gêneros Assistidos</h3>
                <ul>
                    {topGenres.map((genre, index) => (
                        <li key={index}>
                            {genre.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}