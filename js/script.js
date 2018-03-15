// script.js

const icons = ["fas fa-bug", "fas fa-bolt",
                  "fas fa-camera", "fas fa-chess-king",
                  "far fa-compass", "fas fa-fighter-jet",
                  "fas fa-gamepad", "fas fa-paw"];

//$('.icon').addClass(icons[1]);

let cards = $('.icon');
for(let j = 0; j < 9; j += 8)
{
  let randomNumber = Math.round(Math.random() * 8);
  for(let i = 0; i < 8; i++)
  {
    $(cards[i + j]).addClass(icons[(i + randomNumber) % 8]);
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
