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
  score = score + patternLength;
  patternLength++;
  userClicks = 0;
  userPattern = [];
  computerPattern = [];
  updateScoreboard();
  setTimeout(function() {
    $tiles.removeClass().addClass('tiles').empty();
    generatePattern();

    setTimeout(displayPattern, 500);
  }, 500);
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
      $element.addClass('show');
      setTimeout(function(){
        $element.removeClass('show');

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

      $(e.target).addClass('chosen');
      if (userPattern.length === computerPattern.length) {
        $tiles.off('click');

        for (let i = 0; i < computerPattern.length; i++) {
          $(`#${computerPattern[i]}`).addClass('right').html(i + 1);
        }

        nextLevel();
      }
    } else {
      $(e.target).addClass('wrong');

      // display correct sequence.
      for (let i = 0; i < computerPattern.length; i++) {
        $(`#${computerPattern[i]}`).addClass('chosen').html(i + 1);
      }

      lives--;
      patternLength--;
      level--;
      nextLevel();
    }
  });
}
