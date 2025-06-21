import styles from './Grid.module.css';
import Cell from './Cell/Cell';


export default function Grid(props) {
    return (
        <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div id={styles.contain} style={{gap: `${(props.gap ? props.gap : 10)}px`}}>
                {
                    Array(Number(props.height)).fill(0).map(() => <div className={styles.line} style={{
                        gap: `${(props.gap ? props.gap : 10)}px`
                    }}>{
                        Array(Number(props.width)).fill(0).map( (key) => <Cell key={key}/>)
                    }</div>)
                }
            </div>
        </div>
        </>
    )
}