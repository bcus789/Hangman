const startBtn = document.getElementById("start-button")
const guessBtn = document.getElementById("submit-letter")
const wordDiv = document.getElementById("word-div")
const submitLetter = document.getElementById("submit-letter")
const letterInput = document.getElementById("letter-input")
let wordBank = ["penny"]
let chosenWord = ""
let hiddenWord = ""

startBtn.addEventListener("click", startGame)

function startGame(){
    chosenWord = pickWord()
    hiddenWord = hideText(chosenWord)
    wordDiv.innerText = hiddenWord
}

function pickWord(){
    for (let i = 0; i < wordBank.length; i ++){
        const random = Math.floor(Math.random() * wordBank.length)
        let word = wordBank[random]
        return word
    }
}

function hideText(word){
    return "-".repeat(word.length)
}

submitLetter.addEventListener("click", function(){
    checkLetter(letterInput.value)
})

function checkLetter(letter){
    for (let i = 0; i < chosenWord.length; i++){
        if (chosenWord.charAt(i) === letter){
            replaceBlank(i, letter)
        }
    }
}

function replaceBlank(index, letter){
   let newString = hiddenWord.replace(/-/g, letter)
   console.log(newString)
}