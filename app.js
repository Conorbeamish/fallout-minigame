document.addEventListener("DOMContentLoaded", function(){
    const numWords = 5;
    var numGuess = 4;
    var password = " ";

    var start = document.getElementById("start-game");
    start.addEventListener("click", () => {
        startGame();
    });
    
    function getValues(array, numVals){
        return shuffle(array).slice(0, numVals);
    }
    
    function shuffle(array){
        var arrayCopy = array.slice();
        for (let i = arrayCopy.length - 1; i > 0;  i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
        }
        return arrayCopy
    }

    function startGame(){
        var wordList = document.getElementById("word-list");
        var randomWords = getValues(easy, numWords);
        randomWords.forEach((word) => {
            var li = document.createElement("li");
            li.innerText = word;
            wordList.appendChild(li);
        });
    }
});
    

