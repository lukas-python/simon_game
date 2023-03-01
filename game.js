let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

document.querySelector().addEventListener("keypress", function(){
    if (!started) {
        document.querySelector("#level-title").innerHTML = "Level "+ level;
        nextSequence();
        started = true;
    }
})

document.querySelector(".btn").addEventListener("click", function(){
    let userChosenColour = document.querySelector(this).getElementById("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})


// Choosing sound for play
function playSound(name) {
    let sound = new Audio("sounds/" + name+".mp3");
    sound.play();

}

// playing sequences in the game
function nextSequence(){
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML = "Level " + level;
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

// button animation
function animatePress(currentColor) {
    document.querySelector("#"+currentColor).classList.add("pressed");
    setTimeout(function(){
        document.querySelector("#" + currentColor).classList.remove("pressed");
    }, 100)}


// checking User answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();}, 1000);
        }
    }
    else {
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        setTimeout(function(){
            document.querySelector("body").classList.remove("game-over")
        }, 200);
        document.querySelector("#level-title").innerHTML = "Game Over, Press Any Key to Restart";
        startOver();
    }
}

// reseting game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}