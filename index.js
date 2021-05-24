
var count = 0;
var tabs = ["tab1","tab2","tab3","tab4"];
var gamepattern = [];
var userpattern = [];
var game_on = true;

$(document).keypress(function() {
  if (game_on) {
    $(".head").text("Level " + count);
    nextSequence();
    game_on = false;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userpattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userpattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamepattern[currentLevel] === userpattern[currentLevel]) {
      if (userpattern.length === gamepattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("laser");
      wrongpress();
      startOver();
    }
}

function nextSequence(){
  userpattern = [];
  count++;
  $(".head").text("Level "+count);
  var i = Math.floor(Math.random()*4);
  var apply = tabs[i];
  gamepattern.push(apply);
  animatePress(apply);
  playSound(apply);
}

function wrongpress(){
  $("body").addClass("wrong");
  $(".head").text("Game Over ,Press any key to Restart")
  setTimeout(function(){
    $("body").removeClass("wrong");}, 200);
}

function playSound(music){
  var audio = new Audio("sounds/"+ music +".wav");
  audio.play();
}

function animatePress(show){
  $("#" + show).addClass("pressed");
  setTimeout(function() {
    $("#"+ show).removeClass("pressed");
  }, 500);
}
function startOver() {
  count = 0;
  gamepattern = [];
  game_on = true;
}
