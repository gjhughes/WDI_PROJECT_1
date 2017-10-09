$(document).ready(function() {

  let $grid;
  let $tiles;
  let $tileId;
  const randomNumbers = [];
  const computerPattern = [];
  const userPattern = [];

  $tiles = $('.tiles');


  function randNum() {
    for (var i = 0; randomNumbers.length < 6; i++) {
      const num = Math.floor(Math.random() * 16);
      if(randomNumbers.includes(num)) {
        console.log('number in array already');
      } else {
        randomNumbers.push(num);
      }
      // randomNumbers.indexOf(num) !== num ? randomNumbers.push(num) : console.log('already in array')
    }
  }
  console.log(randomNumbers);
  // function to selct random tiles and push id to array
  function randomPattern() {
    for (let i = 0; i < 6; i++) {
      computerPattern.push($tiles[i].id);
      $tiles[i].id.css('background-color', '#F0F1F2');
    }
    console.log(computerPattern);
  }

  // function to light up tiles if they are pushed to the pattern array
  // function lightUp() {
  //   for (var i = 0; i < computerPattern.length; i++) {
  //     if($tiles.id === )
  //
  //   }
  // }

  randNum()
  console.log(randomNumbers);

});
