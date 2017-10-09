$(document).ready(function() {

  const $tiles = $('.tiles');
  console.log($tiles)
  const randomNumbers = [];
  let pattern;

  // random number function
  function randNum() {
    for (let i = 0; randomNumbers.length < 6; i++) {
      const num = Math.floor(Math.random() * 16);
      if(randomNumbers.includes(num)) {
        console.log('number in array already');
      } else {
        randomNumbers.push(num);
      }
      randomNumbers.sort((a, b) => a - b);
    }
  }

  // light up tiles based on random number array
  function displayTile() {
    for (let i = 0; i < randomNumbers.length; i++) {
      const randomNumber = randomNumbers[i];
      const $element = $($tiles[randomNumber]);
      setTimeout(function() {
        $element.css('background', '#F0F1F2');
        setTimeout(function(){
          $element.css('background', '#6E7783');
        }, 1000);
      }, i*1000 + 1000);
    }
  }

  randNum();
  displayTile();
  console.log(randomNumbers);

});

// generat
