const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("submit-letter")
const wordDiv = document.getElementById("word-div")
const submitLetter = document.getElementById("submit-letter")
const letterInput = document.getElementById("letter-input")
const numTries = document.getElementById("tries")
let tries = ""
let wordBank = ["paper", "typwriter", "annabolic"]
let chosenWord = ""
let hiddenWord = ""
let chosenWordArr = []
let hiddenWordArr = []

startBtn.addEventListener("click", startGame)

function startGame() {
    tries = 6
    numTries.innerText = `Tries: ${tries}`
    chosenWord = pickWord()
    chosenWordArr = Array.from(chosenWord)
    hideText(chosenWord)
    hiddenWordArr = Array.from(hiddenWord)
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
    for (i = 0; i < chosenWordArr.length; i++) {
        let letter = letterInput.value
        if (chosenWordArr[i] === letter) {
            hiddenWordArr[i] = letter
        } 
    }
    updateTriesAndLosses()
    renderHidden(hiddenWordArr)
}

function updateTriesAndLosses(){
    tries --
    numTries.innerText = `Tries: ${tries}`
}