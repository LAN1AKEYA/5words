import './App.css'
import Grid from './components/Grid/Grid'
import Keyboard from './components/Keyboard/Keyboard'
import { KeyboardHandle } from './engine/Engine';
import { useState, useEffect } from 'react';

const allKeys = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ","ф","ы","в","а","п","р","о","л","д","ж","э","я","ч","с","м","и","т","ь","б","ю"]
const userWord = "выкройка";
const wordLength = userWord.length;
const attemptsLength = userWord.length;




let carriage = [0, 0];


export default function App() {


function binarCode(input) {
  const encoder = new TextEncoder();
  const encodedData = encoder.encode(input);
  const binaryResult = 
      [...encodedData].map(byte => byte.toString(2)
          .padStart(8, '0')).join(' ');
  return binaryResult;
}

function binarEncode(input) {
  return String.fromCharCode(...input.split(' ').map(bin => parseInt(bin, 2)))
}

const inputString = window.location.href;
const binar = binarCode(inputString);

console.log(binar);

console.log(binarEncode(binar))
    

  
  const encodeXOR = (messege, key) => {
    
  }

  
  const word = decodeURI(window.location.href).slice(22, 50);


  //console.log(word)




  const [wordsBank, setWordBank] = useState([]);
  const [settedWord, setWord] = useState('');



  useEffect(() => {
    fetch('/public/russian-words.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const filteredWords = data.filter(item => (item.length == wordLength));
        setWordBank(filteredWords);
        setWord(filteredWords[Math.floor(Math.random() * (filteredWords.length - 0 + 1))])
        setWord(userWord);
      })
    }, [])
    

  //Класс, описывающий линии
  class Line {
    constructor(cells) {
      this.cells = cells;
    }
  }

  //Класс, описывающий ячейки
  class Cell {
    constructor(status, letter) {
      this.status = status ? status : "";
      this.letter = letter ? letter : "";
    }
  }

  //Первичное создание управляющего массива
  const [GridBank, changeGridBank] = useState(Array.from({length:Number(attemptsLength)},() => new Line(Array.from({length:Number(wordLength)},() => new Cell()))))
  

  //Изменение буквы
  const changeLetter = (position, insert) => {
    changeGridBank(
      GridBank.map(row => 
        GridBank.indexOf(row) == position[1] ?
          new Line(row.cells.map((cell) =>
            row.cells.indexOf(cell) == position[0] ?
              new Cell(cell.status, insert)
            : cell
        )) : row
      )
    )
  }

  const statusParcing = (position, settedWord) => {
    changeGridBank(
      GridBank.map(row => 
        GridBank.indexOf(row) == position ?
          new Line(row.cells.map((cell, i) =>
            cell.letter == settedWord[i] ?
              new Cell("guessed", cell.letter)
            : (settedWord.includes(cell.letter)) ?
              (
                (row.cells.filter(cellRe => cellRe.letter == cell.letter).length <=
                settedWord.split('').filter((cellRe, iRe) => cellRe == cell.letter).length) &&
                (settedWord.split('').filter((cellRe, iRe) => cellRe == cell.letter).length > 0)
              ) ?
              new Cell("common", cell.letter)
              : cell
            : new Cell("unused", cell.letter)
        )) : row
      )
    )
  }
  
  const [consoleText, consoleChangeText] = useState('');

  const handleInsertLetter = (l) => {

    changeLetter(carriage, l);

    if (carriage[0] != 'end') {
      carriage[0]++;
      if (carriage[0] == wordLength) {
        carriage[0] = 'end'
      }
    }
  }

  const handleDeleteLetter = () => {

    if (carriage[1] != "end") {
      if (carriage[0] == "end") {
        carriage[0] = wordLength - 1;
      }
      else {
        if (carriage[0] != 0) {
          carriage[0]--;
        }
      }
      consoleChangeText('');
    }
    changeLetter(carriage, "");
  }




  const handleConfirm = () => {
    if (carriage[0] == "end") { //строка введена?

      if (carriage[1] != "end") { //кол-во попыток НЕ закончилось?
        const word = GridBank[carriage[1]].cells.map(item => item.letter).join(''); 
        consoleChangeText(word);
        if (wordsBank.includes(word)) { // существует ли слово?
          statusParcing(carriage[1], settedWord); 
          if (word == settedWord) { // отгадали ли?
            consoleChangeText('отгадали')
            carriage = ["end", "end"];
          }
          else {
            consoleChangeText('не отгадали')
            carriage = [0, carriage[1]+1];
          }
        }
        else {
          consoleChangeText('такого слова нету')
        }
      }

      if (carriage[1] == attemptsLength) { //кол-во попыток закончилось?
        carriage = ["end", "end"];
      }

    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (allKeys.includes(e.key)) {
        handleInsertLetter(e.key)
        consoleChangeText('')
      }
      else if (e.code === "Backspace") {
        handleDeleteLetter()
      }
      else if (e.code === "Enter") {
        handleConfirm()
      }
    }
    


    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  })




  return (
    <>
      <Grid width={wordLength} height={attemptsLength} gap="10" word="чай" consoleText={consoleText} GridBank={GridBank}/>
      <Keyboard handleInsert={handleInsertLetter} handleDelete={handleDeleteLetter} GridBank={GridBank}/>
    </>
  )
}