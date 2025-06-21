import styles from './Keyboard.module.css'
import { KeyboardHandle } from '../../engine/Engine';

export default function Keyboard() {


 

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
                    onClick={() => KeyboardHandle("virtual", key)}
                    className={styles.keyButton}
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