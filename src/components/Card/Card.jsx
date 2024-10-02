import styles from "./styles.module.css";

export default function Card({title}) {
    return (
        <div className={styles.card}>
            <h2>{title}</h2>
        </div>
    )
}