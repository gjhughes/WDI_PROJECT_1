$(() => {

  const $tiles = $('.tiles');
  console.log($tiles);
  let $clicked;
  const randomPattern = [];
  const userPattern = [];

  // random number function
  function randNum() {
    for (let i = 0; randomPattern.length < 6; i++) {
      const num = Math.floor(Math.random() * 16);
      if(randomPattern.includes(num)) {
        console.log('number in array already');
      } else {
        randomPattern.push(num);
      }
      randomPattern.sort((a, b) => a - b);
    }
  }

  // light up tiles based on random number array
  function displayTile() {
    for (let i = 0; i < randomPattern.length; i++) {
      const randomNumber = randomPattern[i];
      const $element = $($tiles[randomNumber]);
      setTimeout(function() {
        $element.css('background', '#F0F1F2');
        setTimeout(function(){
          $element.css('background', '#6E7783');
        }, 500);
      }, i*500 + 500);
    }
  }

  // create array from users clicked tiles
  function clickHandler() {
    $tiles.on('click', function(e) {
      $clicked = $(e.target);
      $clicked.css('background', '#77AAAD');
      console.log($clicked);
    });
  }
  clickHandler();

  randNum();
  displayTile();
  console.log(randomPattern);

});

// generat
