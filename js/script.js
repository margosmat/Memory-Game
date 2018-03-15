// script.js

const icons = ["fas fa-bug", "fas fa-bolt",
                  "fas fa-camera", "fas fa-chess-king",
                  "far fa-compass", "fas fa-fighter-jet",
                  "fas fa-gamepad", "fas fa-paw"];

let cards = $('.icon');
let cardBacks = [,,,,,,,,,,,,,,,];
let cardBacksCopy = [,,,,,,,,,,,,,,,];
for(let j = 0; j < 9; j += 8)
{
  let randomNumber = Math.round(Math.random() * 8);
  for(let i = 0; i < 8; i++)
  {
    cardBacks[i+j] = icons[(i + randomNumber) % 8];
  }
  const iconsCopy = 1;
}
for(let i = 0; i < 8; i++)
{
  cardBacksCopy[i] = cardBacks[i*2];
  cardBacksCopy[i+8] = cardBacks[16 - (i*2+1)];
}

for(let i = 0; i < 16; i++)
{
  $(cards[i]).addClass(cardBacksCopy[i]);
}

let count = 0;
$('.card').on('click', function(e) {
  console.log(e);
  let parent = $(e.target).parent();
  if ( parent.hasClass('flipped') )
  {
		// sparent.removeClass('flipped');
	}
  else {
    if(count === 2)
    {
      unflip();
      count = 0;
    }
    parent.addClass('flipped');
    count++;
	}
});

function unflip() {
  let flippedCards = document.getElementsByClassName('card');
  for(card of flippedCards)
  {
    if($(card).hasClass('flipped')){
      $(card).removeClass('flipped');
    }
  }
}
