const allCodes = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period'];
const allKeys = ["Й","Ц","У","К","Е","Н","Г","Ш","Щ","З","Х","Ъ","Ф","Ы","В","А","П","Р","О","Л","Д","Ж","Э","Я","Ч","С","М","И","Т","Ь","Б","Ю"]


const wordsBank = ["ЧАЙ", "ДОМ", "ЖИР"];
const settedWord = wordsBank[0];
let compainWord = '';


export const KeyboardHandle = (wordLength) => {
    document.addEventListener('keydown', (event) => {
        const settedLetter = allKeys[allCodes.indexOf(event.code)];
        
        if (settedLetter != undefined) {
            compainWord += settedLetter;
            document.getElementById(`«r${compainWord.length - 1}»`).innerText = settedLetter;
        }
        else if (event.code == 'Backspace') {
            compainWord = compainWord.slice(0, -1);
            /*
            for (let i = 0; i < wordLength; i++) {
                document.getElementById(`«r${i}»`).innerText = allKeys[compainWord[i]] ? allKeys[compainWord[i]] : "";
            }*/
        }
        console.log(settedWord);
        console.log(compainWord);
        if (compainWord.length == wordLength) {
            if (wordsBank.includes(compainWord)) {
                if (compainWord == settedWord) {
                    alert('мы отгадали')
                    compainWord = '';
                }
                else {
                    alert('мы не отгадали')
                    compainWord = '';
                }
            }
            else {
                alert('недопустимое слово')
                compainWord = '';
            }
        }
    })
}