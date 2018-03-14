// script.js
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
