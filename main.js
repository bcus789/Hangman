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
        img.src = "/hangman_images/hang_0.png"
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
        console.log(tries)

        switch (tries) {
            case 9:
            img.src = "/hangman_images/hang_1.png";
            break;
            case 8:
            img.src = "/hangman_images/hang_2.png";
            break;
            case 7:
            img.src = "/hangman_images/hang_3.png";
            break;
            case 6:
            img.src = "/hangman_images/hang_4.png";
            break;
            case 5:
            img.src = "/hangman_images/hang_5.png";
            break;
            case 4:
            img.src = "/hangman_images/hang_6.png";
            break;
            case 3:
            img.src = "/hangman_images/hang_7.png";
            break;
            case 2:
            img.src = "/hangman_images/hang_8.png";
            break;
            case 1:
            img.src = "/hangman_images/hang_9.png";
            break;
            case 0:
            img.src = "/hangman_images/hang_10.png";
            break;
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

        if (!chosenWordArr.includes(letter)){
            tries --
        }
        game.renderScreen()
    }
}

startBtn.addEventListener("click", game.start)
guessBtn.addEventListener("click", guessedLetter.compare)

