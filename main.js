const gameDiv = document.getElementById("game-div")
const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("guess-button")
const wordDiv = document.getElementById("word-div")
const inputField = document.getElementById("input-field")
const numTries = document.getElementById("tries-left")
const lettersTried = document.getElementById("letters-tried")
const wordBank = ['paper','potato', 'mobile', 'lego', 'jacket', 'apple', 'cat', 'throne', 'street', "jungle"]

let tries
let chosenWordArr = []
let hiddenWordArr = []

const game = {
    start: function() {
        tries = 10
        numTries.innerText = tries
        chosenWordArr = Array.from(game.pickWord(wordBank))
        hiddenWordArr = chosenWordArr.map(() => "-")
        
    },
    pickWord: function(words) {
        randomNum = Math.floor(Math.random() * words.length)
        return words[randomNum]
    }
}

startBtn.addEventListener("click", game.start)

