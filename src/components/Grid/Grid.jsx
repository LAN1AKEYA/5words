import { Component, useState } from 'react';
import styles from './Grid.module.css';
import Cell from './Cell/Cell';
import Console from '../../engine/Console';


export default function Grid(props) {



    return (
        <>
        <div id={styles.contain}>
            <div id={styles.box} style={{gap: `${(props.gap ? props.gap : 10)}px`}}>

          

                {

                    props.GridBank.map((item, key) => 
                        <div key={key} className={styles.line} style={{
                            gap: `${(props.gap ? props.gap : 10)}px`
                        }}>
                            {
                                item.cells.map((letter, key) => <Cell key={key} insertedLetter={letter.letter} state={letter.status}/>) //state - это состояние ячейки (common - стиль встречающейся буквы, guessed - стиль отгаданной буквы)
                            }

                        </div>
                    
                        
                    )
                }
            </div>
                <Console message={props.consoleText}/>
        </div>
        </>
    )
}