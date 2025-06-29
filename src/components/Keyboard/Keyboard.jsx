import styles from './Keyboard.module.css'
import { useState, useEffect } from 'react';

export default function Keyboard(props) {

  function Collect(type) {
    const bank = props.GridBank.map(row => row.cells.filter(cell => cell.status == type).map(cell => cell.letter));
    let collectLetters = [];
    for (let item of bank) {
      collectLetters = [...collectLetters, ...item]
    }
    return collectLetters;
  }

  const collectCommonLetters = Collect('common');
  const collectGuessedLetters = Collect('guessed');
  const collectUnusedLetters = Collect('unused');

  const keysLayout = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'],
    ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'],
    ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '←']
  ];


  return (
    <div className={styles.keyboard}>
        <div className={styles.keyboardLines}>
            {keysLayout.map((row,rowIndex) => (
                <div key={rowIndex} className={styles.keyboardRow}>
                {row.map((key,index) => (
                    <button
                    key={`${rowIndex}-${index}`}
                    onClick={() => (key == '←' ? props.handleDelete() : props.handleInsert(key))}
                    className={`${styles.keyButton} ${collectGuessedLetters.includes(key) ? styles.keyGuessed : (collectCommonLetters.includes(key) ? styles.keyCommon : (collectUnusedLetters.includes(key) ? styles.keyUnused : ""))}`}
                    >
                    {key}
                    </button>
                ))}
                </div>
            ))}
        </div>
    </div>
  );




}