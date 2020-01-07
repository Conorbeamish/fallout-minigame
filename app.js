document.addEventListener("DOMContentLoaded", function(){
    const numWords = 8;
    var numGuess = 4;
    var password = " ";
    var difficulty = easy;
   
    var start = document.getElementById("start-game");
    start.addEventListener("click", () => {
        toggleClasses(document.getElementById('start-game'), 'hide', 'show');
        toggleClasses(document.getElementById('game-board'), 'hide', 'show');
        checkDifficulty();
        startGame();
    });
    
    function getValues(array, numVals){
        return shuffle(array).slice(0, numVals);
    }

    function toggleClasses(element, ...classNames) {
        classNames.forEach(name => element.classList.toggle(name));
    }

    function shuffle(array){
        var arrayCopy = array.slice();
        for (let i = arrayCopy.length - 1; i > 0;  i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
        }
        return arrayCopy
    }

    function checkDifficulty(){
        var difficultySelector = document.getElementsByName("difficulty");
        for(i = 0; i < difficultySelector.length; i++){
            if(difficultySelector[i].checked){
                difficulty = difficultySelector[i].value;
            }
        }
        if(difficulty === "hard"){
            difficulty = hard
        } else if(difficulty === "medium"){
            difficulty = medium
        } else {
            difficulty = easy
        }
        toggleClasses(document.getElementById("difficulty"), 'hide', 'show');
    }

    function startGame(){
        var wordList = document.getElementById("word-list");
        var randomWords = getValues(difficulty, numWords);
        var help = document.getElementById("help");
        var helpBoard = document.getElementById("help-board");
        var helpClose = document.getElementById("help-close");

        //Populate game board
        randomWords.forEach((word) => {
            var btn = document.createElement("BUTTON");
            var span = document.createElement("span");
            var asciiText = getValues(ascii, 1);
            btn.innerText = `${word}`;
            wordList.appendChild(btn);
            span.innerText = ` ${asciiText} `
            wordList.appendChild(span);
        });

        //Set Password
        password = getValues(randomWords, 1)[0];
        setNumGuess(numGuess);

        wordList.addEventListener("click", gamePlay);
        help.addEventListener("click", () => {toggleClasses(helpBoard, "hide", "show")} );
        helpClose.addEventListener("click", () => {toggleClasses(helpBoard, "hide", "show")});
    }

    function setNumGuess(guesses){
        numGuess = guesses
        document.getElementById("guess-count").innerText = "Attempts remaining: "
        //Shows a solid block for each remaining guess
        for(i = 0; i < numGuess; i++){
            document.getElementById("guess-count").innerHTML += `&#9608`
        }
    }

    function gamePlay(choice){
        if(choice.target.tagName === "BUTTON" && !choice.target.classList.contains("guessed")){

            //check selected word against password
            var guess = choice.target.innerText;
            var correctLetters = compareWords(guess, password);
            choice.target.classList.add("guessed");
            document.getElementById("past-guesses").innerHTML += `${choice.target.innerText} : ${correctLetters} correct letters <br />`;
            setNumGuess(numGuess - 1);
        }
        //Check if game is over
        var hackAgain = document.getElementById("hack-again");
        var gameBoard = document.getElementById('game-board');
        var winImage = document.getElementById("win-image");
        var loseImage = document.getElementById("lose-image");
        if (correctLetters === password.length){
            toggleClasses(gameBoard, 'hide', 'show');
            toggleClasses(hackAgain, 'hide', 'show');
            toggleClasses(winImage, 'hide', 'show');
            document.getElementById("winner").innerText = `Password accepted: ${password}`
            this.removeEventListener('click', gamePlay);
        } else if (numGuess === 0) {
            toggleClasses(gameBoard, 'hide', 'show');
            toggleClasses(hackAgain, 'hide', 'show');
            toggleClasses(loseImage, 'hide', 'show');
            document.getElementById("loser").innerText = `Too many attempts, password locked`
            this.removeEventListener('click', gamePlay);
        }
    }

    function compareWords(word1, word2){
        var count = 0;
        for(let i = 0; i < word1.length; i++){
            if(word1[i] === word2[i]) {
                count++;
            }
        }
        return count;
    }
});
    

