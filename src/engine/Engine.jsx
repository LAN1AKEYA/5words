const allCodes = ['KeyQ','KeyW','KeyE','KeyR','KeyT','KeyY','KeyU','KeyI','KeyO','KeyP','BracketLeft','BracketRight','KeyA','KeyS','KeyD','KeyF','KeyG','KeyH','KeyJ','KeyK','KeyL','Semicolon','Quote','KeyZ','KeyX','KeyC','KeyV','KeyB','KeyN','KeyM','Comma','Period'];
const allKeys = ["й","ц","у","к","е","н","г","ш","щ","з","х","ъ","ф","ы","в","а","п","р","о","л","д","ж","э","я","ч","с","м","и","т","ь","б","ю"]


const wordsBank = ["чай", "дом", "жир"];
const settedWord = wordsBank[0];
const wordLength = 3;
let compainWord = '';


export const KeyboardHandle = (type, code) => {
    console.log(type, code)
        const settedLetter = type == "phisical" ? allKeys[allCodes.indexOf(code)] : code;
        
        if (settedLetter != undefined) {
            compainWord += settedLetter;
            document.getElementById(`«r${compainWord.length - 1}»`).innerText = settedLetter;
        }
        else if (code == 'Backspace') {
            compainWord = compainWord.slice(0, -1);
            /*
            for (let i = 0; i < wordLength; i++) {
                document.getElementById(`«r${i}»`).innerText = allKeys[compainWord[i]] ? allKeys[compainWord[i]] : "";
            }*/
        }
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
}