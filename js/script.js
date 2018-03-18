// script.js

const icons = ["fas fa-bug", "fas fa-bolt",
                  "fas fa-camera", "fas fa-chess-king",
                  "far fa-compass", "fas fa-fighter-jet",
                  "fas fa-gamepad", "fas fa-paw"];

let cards = $('.icon');
let cardBacks = [];
let movesCount = 0;

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

$('.card').on('click', function(e) {
  
  let parent = $(e.target).parent();
  if ( !parent.hasClass('flipped') )
  {
    parent.addClass('flipped');
    if($('.flipped').length === 2)
    {
      // Adds empty div that prevents user from clicking
      // when cards comparing animations are running
      $('body').append('<div class="event-catcher"></div>');

      // Card comparison
      let flippedCards = $('.flipped').find('.card-back').children();
      let areLogosTheSame = $(flippedCards[0]).attr('class') === $(flippedCards[1]).attr('class');
      compareCards(flippedCards, areLogosTheSame);

      // Removing event catcher
      if($('body').has('.event-catcher'))
      {
        setTimeout(function(){
          $('body').find('.event-catcher').remove();
        }, 800);
      }

      countMoves();      
    }    
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

function compareCards(flippedCards, areLogosTheSame)
{
  if(areLogosTheSame)
  {
    setTimeout(function(){
      for(card of flippedCards)
      {
        $(card).parent().parent().removeClass('flipped');
        $(card).parent().parent().addClass('success');
        $(card).parent().addClass('back-success');
      }
    }, 500);
  }
  else
  {
    setTimeout(function(){
      $(flippedCards).parent().parent().toggleClass('wrong');
    }, 500);
    setTimeout(function(){
      for(card of flippedCards)
      {
        $(card).parent().parent().removeClass('wrong');
      }
      unflip();
    }, 1100);        
  }      
}

function countMoves() {
  movesCount++;
  $('.moves-count').text(movesCount);
  starsRefresh();
}

function starsRefresh()
{
  if(movesCount % 10 === 0)
  {
    let stars = $('.fa-star').filter("svg[data-prefix='fas']");
    let star = stars.last();
    star.removeClass('fas');
    star.addClass('far');
  }
}