let $tiles            = null;
let $level            = null;
let $lives            = null;
let $score            = null;
let $grid             = null;
let $play             = null;
let $restart          = null;
let $gameover         = null;

let patternLength     = 1;
let lives             = 3;
let level             = 0;
let score             = 0;
let userClicks        = 0;
let computerPattern;
let userPattern;
//timeouts
let gameoverTimeout;
let flashPattern;
let removeFlash;
let displayPatternTimeout;
let nowDisplayIt;
let fadeInTiles;
let playGameTimeout;


$(init);

function init() {
  $tiles    = $('.tiles');
  $grid     = $('.grid');
  $level    = $('.level');
  $lives    = $('.lives');
  $score    = $('.score');
  $play     = $('.play-btn');
  $restart  = $('.restart-btn');
  $gameover = $('.game-over-message');

  $restart.hide();
  $tiles.hide();

  $('button').on('click', startGame);
  $restart.on('click', reset);
}

function startGame() {
  $tiles.off();
  patternLength     = 1;
  lives             = 3;
  score             = 0;
  level             = 1;
  userClicks        = 0;
  computerPattern   = [];
  userPattern       = [];
  $lives.html(lives);
  $level.html(patternLength);

  playGameTimeout = setTimeout(playGame, 500);
}

function playGame() {
  clearTimeout(playGameTimeout);
  displayTiles();
  updateScoreboard();
  generatePattern();
  setTimeout(displayPattern, 500);
}

function gameOver() {
  $grid.addClass('game-over');
  $tiles.hide();
  $gameover.show();
  $grid.append($restart.show());
}

function reset(){
  $restart.hide();
  $grid.removeClass('game-over');
  $gameover.hide();
  $grid.addClass('grid').show();
  startGame();
}

function displayTiles() {
  $play.hide();
  $grid.removeClass('start-grid');
  fadeInTiles = setTimeout(function() {
    $tiles.fadeIn();
    clearTimeout(fadeInTiles);
  }, 250);
}

function nextLevel() {

  patternLength   ++;
  userClicks      = 0;
  userPattern     = [];
  computerPattern = [];
  $tiles.off();
  updateScoreboard();

  if(lives === 0) {

    gameoverTimeout = setTimeout(function() {
      $tiles.removeClass().addClass('tiles').empty();
      gameOver();
    }, 1500);
    clearTimeout(displayPatternTimeout);
    clearTimeout(flashPattern);
    clearTimeout(removeFlash);
    return;
  }

  displayPatternTimeout = setTimeout(function() {
    $tiles.removeClass().addClass('tiles').empty();
    generatePattern();
    clearTimeout(displayPatternTimeout);
    nowDisplayIt = setTimeout(displayPattern, 500);
  }, 1000);
}

function updateScoreboard() {
  level ++;
  $level.html(patternLength);
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
  clearTimeout(nowDisplayIt);
  for (let i = 0; i < computerPattern.length; i++) {
    const randomNumber = computerPattern[i];
    const $element = $($tiles[randomNumber]);
    flashPattern = setTimeout(function() {
      $element.addClass('show');
      removeFlash = setTimeout(function(){
        $element.removeClass('show');
        if (i + 1 === computerPattern.length) {
          tileOver();
          $tiles.on('click', clickTile);
        }
      }, 500);
    }, i*500 + 500);
  }
}

function tileOver() {
  $tiles.on('mouseover', function(e) {
    $(e.target).addClass('hover');
  });
  $tiles.on('mouseleave', function(e) {
    $(e.target).removeClass('hover');
  });

}

function clickTile(e) {
  $(e.target).off();
  const $clicked = $(e.target).attr('id');

  if ($clicked === computerPattern[userClicks]) {
    score = score + 10;
    userPattern.push($clicked);
    userClicks++;

    $(e.target).addClass('chosen');

    if (userPattern.length === computerPattern.length) {
      for (let i = 0; i < computerPattern.length; i++) {
        $(`#${computerPattern[i]}`).addClass('right');
      }
      nextLevel();
    }
  } else {
    $(e.target).addClass('wrong-button');
    lives--;
    for (let i = 0; i < computerPattern.length; i++) {
      $(`#${computerPattern[i]}`).addClass('wrong-pattern').html(i + 1);
    }
    level--;
    patternLength--;
    nextLevel();
  }
}
