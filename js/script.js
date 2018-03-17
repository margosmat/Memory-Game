// script.js

const icons = ["fas fa-bug", "fas fa-bolt",
                  "fas fa-camera", "fas fa-chess-king",
                  "far fa-compass", "fas fa-fighter-jet",
                  "fas fa-gamepad", "fas fa-paw"];

let cards = $('.icon');
let cardBacks = [];

for(let j = 0; j <= 8; j+=8)
{
  for(let i = 0; i < 8; i++)
  {
    cardBacks[i+j] = icons[i];
  }
}

shuffleArray(cardBacks);

for(let i = 0; i < 16; i++)
{
  $(cards[i]).addClass(cardBacks[i]);
}

// Durstenfeld shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
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
