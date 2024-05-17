const gameDiv = document.getElementById("game-div")
const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("guess-button")
const wordDiv = document.getElementById("word-div")
const inputField = document.getElementById("input-field")
const numTries = document.getElementById("tries-left")
const lettersTried = document.getElementById("letters-tried")
const img = document.getElementById("image")
// const wordBank = ['paper','potato', 'mobile', 'lego', 'jacket', 'apple', 'cat', 'throne', 'street', "jungle"]
const wordBank = ['paper']

let tries
let chosenWordArr
let hiddenWordArr

const game = {
    start: function() {
        gameDiv.style.display = "inline"
        startBtn.innerText = "Restart"
        tries = 10
        chosenWordArr = []
        hiddenWordArr = []
        chosenWordArr = Array.from(game.pickWord())
        hiddenWordArr = chosenWordArr.map(() => "-")
        game.renderScreen()
    },
    pickWord: function() {
        randomNum = Math.floor(Math.random() * wordBank.length)
        return wordBank[randomNum]
    },
    renderScreen: function (){
        wordDiv.innerText = ""
        for (let i = 0; i < hiddenWordArr.length; i ++){
            wordDiv.innerText += hiddenWordArr[i]
        }
        numTries.innerHTML = `Tries Left ${tries}`

        switch (tries) {
            case 0:
            tries = 9;
            img.setAttribute( "src", "/hangman_images/hang_2.png");

        }
    },
}

const guessedLetter = {
    compare: function (){
        letter = inputField.value
        lettersTried.innerHTML += letter + " "

        for (let i = 0; i < chosenWordArr.length; i ++) {
            if (chosenWordArr[i] == letter){
                hiddenWordArr[i] = letter
            }
        }
        game.renderScreen()

            if (!chosenWordArr.includes(letter)){
                tries --
                game.renderScreen()
            }
    }
}

startBtn.addEventListener("click", game.start)
guessBtn.addEventListener("click", guessedLetter.compare)

