let $tiles            = null;
let $level            = null;
let $lives            = null;
let $score            = null;
let $grid             = null;
let $play             = null;
let $restart          = null;
let $gameover;
let patternLength     = 1;
let lives             = 3;
let level             = 0;
let score             = 0;
let userClicks        = 0;
let computerPattern;
let userPattern;

$(init);

function init() {
  $tiles   = $('.tiles');
  $grid    = $('.grid');
  $level   = $('.level');
  $lives   = $('.lives');
  $score   = $('.score');
  $play    = $('.play-btn');
  $restart = $('.restart-btn');
  $gameover = $('.game-over-message');

  $restart.hide();
  $tiles.hide();

  $('button').on('click', startGame);
  $restart.on('click', reset);
}

function startGame() {
  $tiles.off('click mouseover mouseleave');
  patternLength = 1;
  lives = 3;
  score = 0;
  level = 1;
  userClicks = 0;
  computerPattern   = [];
  userPattern       = [];
  $lives.html(lives);
  $level.html(patternLength);

  setTimeout(function() {
    displayTiles();
    updateScoreboard();
    generatePattern();
    setTimeout(function() {
      displayPattern();
    }, 500);
  }, 500);
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
  setTimeout(function() {
    $tiles.fadeIn();
  }, 250);
}

function nextLevel() {
  patternLength++;
  userClicks = 0;
  userPattern = [];
  computerPattern = [];
  $tiles.off('click mouseover mouseleave');
  updateScoreboard();
  setTimeout(function() {
    $tiles.removeClass().addClass('tiles').empty();
    generatePattern();
    setTimeout(displayPattern, 500);
  }, 1000);
  if(lives===0) {
    setTimeout(function() {
      gameOver();
    }, 1500);
  }

}

function updateScoreboard() {
  level++;
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
  for (let i = 0; i < computerPattern.length; i++) {
    const randomNumber = computerPattern[i];
    const $element = $($tiles[randomNumber]);
    setTimeout(function() {
      $element.addClass('show');
      setTimeout(function(){
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
  console.log('I fired');
  const $clicked = $(e.target).attr('id');

  if ($clicked === computerPattern[userClicks]) {
    score = score + 10;
    userPattern.push($clicked);
    userClicks++;

    $(e.target).addClass('chosen');

    if (userPattern.length === computerPattern.length) {
      // $tiles.off('click');
      for (let i = 0; i < computerPattern.length; i++) {
        $(`#${computerPattern[i]}`).addClass('right');
      }
      nextLevel();
    }
  } else {
    $(e.target).addClass('wrong-button');
    console.log(lives);
    lives--;
    console.log(`lives when I remove thiem ${lives}`);
    // display correct sequence.
    for (let i = 0; i < computerPattern.length; i++) {
      $(`#${computerPattern[i]}`).addClass('wrong-pattern').html(i + 1);
    }

    level--;
    patternLength--;
    nextLevel();
  }
}
