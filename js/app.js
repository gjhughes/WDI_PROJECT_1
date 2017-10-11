let $tiles            = null;
let $level            = null;
let $lives            = null;
let $score            = null;

let patternLength     = 1;
let lives             = 3;
let level             = 0;
let score             = 0;
let userClicks        = 0;
let computerPattern   = [];
let userPattern       = [];


$(init);

function init() {

  $tiles  = $('.tiles');
  $level  = $('.level');
  $lives  = $('.lives');
  $score  = $('score');

  $('button').on('click', startGame);

}

function startGame() {

  updateScoreboard();
  generatePattern();
  displayPattern();

}

function nextLevel() {
  $tiles.remove('html');
  $tiles.off('click');
  // reset tiles to original colour
  // update pattern length
  score = score + patternLength;
  patternLength++;
  userClicks = 0;
  userPattern = [];
  computerPattern = [];
  updateScoreboard();
  setTimeout(function() {
    $tiles.css('background', '#6E7783');
  }, 500);
  generatePattern();
  displayPattern();
}

function updateScoreboard() {
  level++;
  $level.html(level);
  $lives.html(lives);
  $score.html(score);
}

function generatePattern() {
  for (let i = 0; computerPattern.length < patternLength; i++) {
    const num = Math.floor(Math.random() * 16).toString();
    if(!computerPattern.includes(num))
      computerPattern.push(num.toString());
  }
}

function displayPattern() {
  for (let i = 0; i < computerPattern.length; i++) {
    const randomNumber = computerPattern[i];
    const $element = $($tiles[randomNumber]);
    setTimeout(function() {
      $element.css('background', '#F0F1F2');
      setTimeout(function(){
        $element.css('background', '#6E7783');

        if (i + 1 === computerPattern.length) {
          checkMatch();
        }
      }, 500);
    }, i*500 + 500);
  }
}

function checkMatch() {
  $tiles.on('click', function(e) {

    const $clicked = $(e.target).attr('id');
    if ($clicked === computerPattern[userClicks]) {
      userPattern.push($clicked);
      userClicks++;


      $(e.target).css('background', '#9DC3C1');
      if (userPattern.length === computerPattern.length) {
        nextLevel();
      }
    } else {
      $(e.target).addClass('wrong');
      // display correct sequence.
      for (var i = 0; i < computerPattern.length; i++) {
        $(`#${computerPattern[i]}`).css('background', '#F0F1F2').html(i + 1);
      }
      lives--;
      patternLength--;
      level--;
      nextLevel();
    }
  });
}
