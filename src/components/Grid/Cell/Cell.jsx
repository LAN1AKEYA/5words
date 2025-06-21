import { useId } from "react"
import styles from "./Cell.module.css"

export default function Cell() {
    return (
        <div className={styles.cell} id={useId()}></div>
    )
}