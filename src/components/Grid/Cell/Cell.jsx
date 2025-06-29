import { useId } from "react"
import styles from "./Cell.module.css"

export default function Cell(props) {

    const checkState = () => {
        switch (props.state) {
            case "common": return styles.common
            case "guessed": return styles.guessed
            default: return ""
        }
    } 


    return (
        <div className={`${styles.cell} ${checkState()}`} id={useId()}>{props.insertedLetter}</div>
    )
}