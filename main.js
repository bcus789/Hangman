const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("submit-letter")
const wordDiv = document.getElementById("word-div")
const submitLetter = document.getElementById("submit-letter")
const letterInput = document.getElementById("letter-input")
const numTries = document.getElementById("tries")
const lettersTried = document.getElementById("letter-tried")
const wordBank = ['paper','potato', 'mobile', 'lego', 'jacket', 'apple', 'cat', 'throne', 'street', "jungle"]

let tries = ""
let chosenWordArr = []
let hiddenWordArr = []

startBtn.addEventListener("click", startGame)

function startGame() {
    startBtn.innerText = "Restart"
    guessBtn.style.display = "inline"
    tries = 10
    numTries.innerText = `Tries Left: ${tries}`
    lettersTried.innerText = ""
    chosenWordArr = Array.from(pickWord())
    hiddenWordArr = Array.from(hideText(chosenWordArr))
    renderHidden(hiddenWordArr)
}

function pickWord() {
    for (let i = 0; i < wordBank.length; i++) {
        const random = Math.floor(Math.random() * wordBank.length)
        let word = wordBank[random]
        return word
    }
}

function hideText(word) {
    for (i = 0; i < word.length; i++) {
        hiddenWord = "-".repeat(word.length)
        return hiddenWord
    }
}

function renderHidden(word) {
    wordDiv.innerText = ""
    for (i = 0; i < word.length; i++) {
        wordDiv.innerText += hiddenWordArr[i]
    }
}

submitLetter.addEventListener("click", compare)

function compare() {
    pushLettersTried(letterInput.value)
    updateTries(letterInput.value)
    for (i = 0; i < chosenWordArr.length; i++) {
        let letter = letterInput.value
        if (chosenWordArr[i] === letter) {
            hiddenWordArr[i] = letter
        } 
    }
    renderHidden(hiddenWordArr)
    letterInput.value = ""
    checkForWinLoose()
}

function updateTries(letter){
    if (chosenWordArr.includes(letter)){
    } else {
        tries --
        numTries.innerText = `Tries: ${tries}`
    }
}

function pushLettersTried(letter){
    lettersTried.innerHTML += " " + letter
}

function checkForWinLoose(){
        if (hiddenWordArr.includes("-")){
        } else {
            guessBtn.style.display = "none"
            numTries.innerText = "You WIN"
        }
        if (tries === 0){
            guessBtn.style.display = "none"
            numTries.innerText = "You LOOSE"
        }
}