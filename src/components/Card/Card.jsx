import styles from "./styles.module.css";

export default function Card({ title, image }) {
    return (
        <div className={styles.card}>
            <img className={styles.poster}
                src={`https://image.tmdb.org/t/p/w500${image}`}
                alt=""
            />
            <div className={styles.text}>
                <h2>{title}</h2>
            </div>

        </div>
    )
}