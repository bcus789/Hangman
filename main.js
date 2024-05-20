const gameDiv = document.getElementById("game-div")
const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("guess-button")
const wordDiv = document.getElementById("word-div")
const inputField = document.getElementById("input-field")
const numTries = document.getElementById("tries-left")
const numWins = document.getElementById("wins")
const numLosses = document.getElementById("losses")
const lettersTried = document.getElementById("letters-tried")
const img = document.getElementById("image")
const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
// const wordBank = ['paper','potato', 'mobile', 'lego', 'jacket', 'apple', 'cat', 'throne', 'street', "jungle"]
const wordBank = ['paper']

let tries
let wins = 0
let losses = 0
let chosenWordArr
let hiddenWordArr

const game = {
    start: function () {
        img.src = "/hangman_images/hang_0.png"
        gameDiv.style.display = "inline"
        startBtn.innerText = "Restart"
        lettersTried.innerText = ""
        guessBtn.disabled = false
        inputField.disabled = false
        tries = 10
        chosenWordArr = []
        hiddenWordArr = []
        chosenWordArr = Array.from(game.pickWord().toUpperCase())
        hiddenWordArr = chosenWordArr.map(() => "-")
        game.renderScreen()
    },
    pickWord: function () {
        randomNum = Math.floor(Math.random() * wordBank.length)
        return wordBank[randomNum]
    },
    renderScreen: function () {
        inputField.value = null
        wordDiv.innerText = ""
        for (let i = 0; i < hiddenWordArr.length; i++) {
            wordDiv.innerText += hiddenWordArr[i]
        }
        if (!game.checkWin()) {
            numTries.innerHTML = `Tries Left ${tries}`

            switch (tries) {
                case 9:
                    img.src = "/hangman_images/hang_1.png"
                    break;
                case 8:
                    img.src = "/hangman_images/hang_2.png"
                    break;
                case 7:
                    img.src = "/hangman_images/hang_3.png"
                    break;
                case 6:
                    img.src = "/hangman_images/hang_4.png"
                    break;
                case 5:
                    img.src = "/hangman_images/hang_5.png"
                    break;
                case 4:
                    img.src = "/hangman_images/hang_6.png"
                    break;
                case 3:
                    img.src = "/hangman_images/hang_7.png"
                    break;
                case 2:
                    img.src = "/hangman_images/hang_8.png"
                    break;
                case 1:
                    img.src = "/hangman_images/hang_9.png"
                    break;
                case 0:
                    img.src = "/hangman_images/hang_10.png"
                    guessBtn.disabled = true
                    inputField.disabled = true
                    numTries.innerHTML = `YOU LOOSE`
                    losses++
                    numLosses.innerHTML = `Losses: ${losses}`
                    wordDiv.innerText = ""
                    for (let i = 0; i < chosenWordArr.length; i++) {
                        wordDiv.innerText += chosenWordArr[i]
                    }
                    break;
            }
        }
        else {
            guessBtn.disabled = true
            inputField.disabled = true
            wins++
            numWins.innerHTML = `Wins: ${wins}`
            numTries.innerHTML = `YOU WIN`
        }
    },
    checkWin: function () {
        for (let i = 0; i < chosenWordArr.length; i++) {
            if (chosenWordArr[i] !== hiddenWordArr[i]) {
                return false;
            }
        }
        return true
    }
}

const guessedLetter = {
    compareAndReplace: function () {
        letter = inputField.value.toUpperCase()

        if (inputField.value == null || !alphabet.includes(letter)){
            alert("Please Input a Valid Letter A-Z (Case doesnt matter)")
        }
        else {
            lettersTried.innerHTML += letter + " "
            for (let i = 0; i < chosenWordArr.length; i++) {
                if (chosenWordArr[i] == letter) {
                    hiddenWordArr[i] = letter
                }
            }
    
            if (!chosenWordArr.includes(letter)) {
                tries--
            }
    
            wordDiv.innerText = ""
            for (let i = 0; i < hiddenWordArr.length; i++) {
                wordDiv.innerText += hiddenWordArr[i]
            }
        }
        game.renderScreen()
    }
}

startBtn.addEventListener("click", game.start)
guessBtn.addEventListener("click", guessedLetter.compareAndReplace)

