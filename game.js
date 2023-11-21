var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var ongame = true;
var round = 1;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  sound(randomChosenColour);
  console.log(gamePattern);
}

function sound(x) {
  $("#" + x).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio = new Audio("sounds/" + x + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
        round++;
        title(round);
      }, 1000);
    }
  } else {
    ongame = false;
    $("h1").text("Wrong entry! Game Over!");
    // Handle game over logic here
    setTimeout(function () {
      restartGame();
    }, 1000);
  }
}

function title(level) {
  $("h1").text("Level " + level);
}

$(".btn").click(function (event) {
  if (ongame) {
    userChosenColour = event.target.id;
    sound(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function restartGame() {
  gamePattern = [];
  userClickedPattern = [];
  round = 1;
  ongame = true;
  nextSequence();
  title(round);
}

// Initial call to start the game
nextSequence();
