let $tiles            = null;
let $level            = null;
let $score            = null;
let $lives            = null;
let $play             = null;

let lives             = 3;
let level             = 0;
let score             = 0;
let userClicks        = 0;
let computerPattern   = [];
let userPattern       = [];


$(init);

function init() {

  $play   = $('.play');
  $tiles  = $('.tiles');
  $level  = $('.level');
  $score  = $('.score');
  $lives  = $('.lives');

  $('button').on('click', startGame);

}

// function to start game
function startGame() {

  updateScoreboard();
  generatePattern();
  displayPattern();
  checkMatch();

}

// function to move on to next level
function nextLevel() {

  userClicks      = 0;
  computerPattern = [];
  userPattern     = [];
  updateScoreboard();
  generatePattern();
  displayPattern();
  checkMatch();

}


function updateScoreboard() {

  level++;
  $level.html(level);
  $score.html(score);

}

// function to decrease number of lives if user is incorrect
// function decreaseLife() {
//   lives--;
//   $lives(lives);
// }

// function to end game if user runs out of lives
// function gameOver() {
//
// }

// function to generate random pattern of unique tiles
function generatePattern() {
  for (let i = 0; computerPattern.length < 6; i++) {
    const num = Math.floor(Math.random() * 16).toString();
    if(computerPattern.includes(num)) {
      console.log('number in array already');
    } else {
      computerPattern.push(num.toString());
    }
  }
}

// light up tiles based on random number array
function displayPattern() {
  for (let i = 0; i < computerPattern.length; i++) {
    const randomNumber = computerPattern[i];
    const $element = $($tiles[randomNumber]);
    setTimeout(function() {
      $element.css('background', '#F0F1F2');
      setTimeout(function(){
        $element.css('background', '#6E7783');
      }, 1000);
    }, i*1000 + 1000);
  }
}
//
// function to push user input into array
function checkMatch() {
  $tiles.one('click', function(e) {
    const $clicked = $(e.target).attr('id');
    if ($clicked === computerPattern[userClicks]) {
      console.log('correct');
      userPattern.push($clicked);
      userClicks++;
      console.log(userPattern);
      if (userPattern.length === computerPattern.length) {
        nextLevel();
      }
      // continue...
    // } else {
    //   console.log('wrong');
    //   userClicks++;
    //   // gameOver()
    }

  });
}
//
//   // function to check if user array and computer array match
//   function checkMatch() {
//     if(randomPattern.length === userPattern.length) {
//       for (var i = 0; i < randomPattern.length; i++) {
//         if(userPattern[i] === randomPattern[i]) {
//           console.log('Match');
//         } else {
//           console.log('Incorrect');
//         }
//       }
//     }
//   }
//
// function to change colour of tiles if correct on is clicked
// function tileColour() {
//   $tiles.on('click', function(e) {
//     const $clicked = $(e.target);
//     $clicked.css('background', '#77AAAD');
//   });
// }
//
//   userInput();
//   tileColour();
//   randNum();
//   displayPattern();
//
//
//   console.log(randomPattern);
//
// });
//
// //
// // once pattern is matched, tiles display second green colour
// // if user is incorrect, pattern displays in red
// // if user has lives left, stay on same level, otherwise game over
