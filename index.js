var buttonColours = ["red", "blue", "green", "yellow"];
// computer's choice
var gamePattern = [];
// user's choice
var userClickedPattern = [];
// https://stackoverflow.com/questions/10578566/jquery-this-id-return-undefined/10578666
// `this` refers to `event.currentTarget`
//The .attr() method gets the attribute value for only the first element in the matched set.
//arrow function doesn't have `this` context
//function () {
//   $(this).attr("id");
// }
// (e) => {
//   $(e.target).attr("id")
// }
var started = false;
var level = 0;
//  track of whether if the game has started or not
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    // detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
    nextSequence();
    started = true;
  }
});

// when any of the buttons are clicked, trigger a handler function.
$(".btn").click(function () {
  // store the id of the button that got clicked.
  // this refers to button object that triggered the click
  var userChosenColour = $(this).attr("id");
  // let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  // console.log($(".btn").attr("class"));
  playSound(userChosenColour);
  animatePress(userChosenColour);
  //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

// compare the gamePattern vs userClickedPattern
function checkAnswer(currentLevel) {
  // check if the most recent user answer is the same as the game pattern.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    //f the user got the most recent answer right, check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    // play wrong.mp3
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    // Call startOver() if the user gets the sequence wrong.
    startOver();
  }
}
//computer's game choice
function nextSequence() {
  // Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  // increase the level by 1 every time nextSequence() is called.
  level++;
  //  update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  // generate a new random number between 0 and 3
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// when a user clicks on a button, the corresponding sound should be played
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// add animation to clicks
function animatePress(currentColour) {
  // add pressed class to the button that gets clicked 
  $("#" + currentColour).addClass("pressed");
  // remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// reset the values of level, gamePattern and started variables.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}