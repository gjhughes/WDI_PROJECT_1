$(() => {

  const $tiles        = $('.tiles');
  const randomPattern = [];
  const userPattern   = [];
  let userClicks      = 0;



  // random number function
  function randNum() {
    for (let i = 0; randomPattern.length < 6; i++) {
      const num = Math.floor(Math.random() * 16).toString();
      if(randomPattern.includes(num)) {
        console.log('number in array already');
      } else {
        randomPattern.push(num.toString());
      }
    }
  }

  // light up tiles based on random number array
  function displayPattern() {
    for (let i = 0; i < randomPattern.length; i++) {
      const randomNumber = randomPattern[i];
      const $element = $($tiles[randomNumber]);
      setTimeout(function() {
        $element.css('background', '#F0F1F2');
        setTimeout(function(){
          $element.css('background', '#6E7783');
        }, 1000);
      }, i*1000 + 1000);
    }
  }

  // function to push user input into array
  function userInput() {
    $tiles.one('click', function(e) {
      // for (var i = 0; i < randomPattern.length; i++) {
      //   const $clicked = $(e.target).attr('id');
      //   if ($clicked === randomPattern[userClicks]) {
      //     console.log('correct');
      //     userClicks++;
      //     // clicked li is not in randomPattern.
      //     // endGame();
      //   } else {
      //     console.log('wrong');
      //     userClicks++;
      //   }
      //   // if($clicked === randomPattern[i]) {
      //   //   userPattern.push($clicked);
      //   //   console.log(userPattern);
      //   //   checkMatch();
      //   // }
      // }
      const $clicked = $(e.target).attr('id');
      if ($clicked === randomPattern[userClicks]) {
        console.log('correct');
        userPattern.push($clicked);
        userClicks++;
        console.log(userPattern);
        // continue...

      } else {
        console.log('wrong');
        userClicks++;
        // gameOver()
      }

    });
  }

  // function to check if user array and computer array match
  function checkMatch() {
    if(randomPattern.length === userPattern.length) {
      for (var i = 0; i < randomPattern.length; i++) {
        if(userPattern[i] === randomPattern[i]) {
          console.log('Match');
        } else {
          console.log('Incorrect');
        }
      }
    }
  }

  // function to change colour of tiles if correct on is clicked
  function tileColour() {
    $tiles.on('click', function(e) {
      const $clicked = $(e.target);
      $clicked.css('background', '#77AAAD');
    });
  }

  userInput();
  tileColour();
  randNum();
  displayPattern();


  console.log(randomPattern);

});

//
// once pattern is matched, tiles display second green colour
// if user is incorrect, pattern displays in red
// if user has lives left, stay on same level, otherwise game over
