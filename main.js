const gameDiv = document.getElementById("game-div")
const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("guess-button")
const newWordBtn = document.getElementById("new-word-button")
const resetWinsLossesBtn = document.getElementById("reset-wins-losses")
const wordDiv = document.getElementById("word-div")
const inputField = document.getElementById("input-field")
const numTries = document.getElementById("tries-left")
const numWins = document.getElementById("wins")
const numLosses = document.getElementById("losses")
const lettersTriedDiv = document.getElementById("letters-tried-div")
const lettersTried = document.getElementById("letters-tried")
const img = document.getElementById("image")
const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const wordBank = ['paper', 'potato', 'mobile', 'lego', 'jacket', 'apple', 'cat', 'throne', 'street', "jungle"]
// const wordBank = ['paper']

let tries 
let wins = 0
let losses = 0
let chosenWordArr
let hiddenWordArr

const game = {
    start: function () {
        img.src = "/hangman_images/hang0.png"
        guessBtn.style.display = "inline"
        gameDiv.style.display = "inline"
        inputField.style.display = "inline"
        lettersTriedDiv.style.display = "block"
        newWordBtn.style.display = "none"
        startBtn.style.display = "none"
        lettersTried.innerText = ""
        guessBtn.disabled = false
        inputField.disabled = false
        numWins.innerHTML = localStorage.getItem('wins')
        numLosses.innerHTML = localStorage.getItem('losses')
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
    resetWinsLossess: function (){
        wins = 0
        losses = 0
        localStorage.setItem("wins", wins.toString())
        localStorage.setItem("losses", losses.toString())
        numWins.innerHTML = localStorage.getItem('wins')
        numLosses.innerHTML = localStorage.getItem('losses')
        game.renderScreen()
    },
    renderScreen: function () {
        inputField.value = null
        wordDiv.innerText = ""
        for (let i = 0; i < hiddenWordArr.length; i++) {
            wordDiv.innerText += hiddenWordArr[i]
        }
        if (!game.checkWin()) {
            numTries.innerHTML = tries

            switch (tries) {
                case 9:
                    img.src = "hangman_images/hang1.png"
                    break;
                case 8:
                    img.src = "hangman_images/hang2.png"
                    break;
                case 7:
                    img.src = "hangman_images/hang3.png"
                    break;
                case 6:
                    img.src = "hangman_images/hang4.png"
                    break;
                case 5:
                    img.src = "hangman_images/hang5.png"
                    break;
                case 4:
                    img.src = "hangman_images/hang6.png"
                    break;
                case 3:
                    img.src = "hangman_images/hang7.png"
                    break;
                case 2:
                    img.src = "hangman_images/hang8.png"
                    break;
                case 1:
                    img.src = "hangman_images/hang9.png"
                    break;
                case 0:
                    img.src = "hangman_images/hang10.png"
                    lettersTriedDiv.style.display = "none"
                    guessBtn.style.display = "none"
                    inputField.style.display = "none"
                    newWordBtn.style.display = "inline"
                    numTries.innerHTML = `YOU LOOSE`
                    tries = 10
                    localStorage.setItem("tries", tries.toString())
                    losses++
                    localStorage.setItem("losses", losses.toString())
                    numLosses.innerHTML = localStorage.getItem("losses")
                    wordDiv.innerText = ""
                    for (let i = 0; i < chosenWordArr.length; i++) {
                        wordDiv.innerText += chosenWordArr[i]
                    }
                    break;
            }
        }
        else {
            guessBtn.style.display = "none"
            inputField.style.display = "none"
            lettersTriedDiv.style.display = "none"
            newWordBtn.style.display = "inline"
            tries = 10
            localStorage.setItem("tries", tries.toString())
            wins++
            localStorage.setItem("wins", wins.toString())
            numWins.innerHTML = localStorage.getItem("wins")
            numTries.innerHTML = `YOU WIN`
            tries = 10
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

        if (inputField.value == null || !alphabet.includes(letter) || lettersTried.innerText.includes(letter)) {
            alert("Please input a valid letter A-Z that hasn't previously been used (Case doesnt matter).")
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
                localStorage.setItem("tries", tries.toString())
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
newWordBtn.addEventListener("click", game.start)
resetWinsLossesBtn.addEventListener("click", game.resetWinsLosses)
guessBtn.addEventListener("click", guessedLetter.compareAndReplace)
inputField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault()
        guessBtn.click()
    }
})