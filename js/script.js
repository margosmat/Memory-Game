// script.js

const icons = ["fas fa-bug", "fas fa-bolt",
                  "fas fa-camera", "fas fa-chess-king",
                  "far fa-compass", "fas fa-fighter-jet",
                  "fas fa-gamepad", "fas fa-paw"];

const successAnimation = `<svg id="successAnimation" class="animated" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 70 70">
                          <path id="successAnimationResult" fill="#D8D8D8" d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"/>
                          <circle id="successAnimationCircle" cx="35" cy="35" r="24" stroke="#979797" stroke-width="2" stroke-linecap="round" fill="transparent"/>
                          <polyline id="successAnimationCheck" stroke="#979797" stroke-width="2" points="23 34 34 43 47 27" fill="transparent"/>
                          </svg>`;

let cards = $('.card-back');
let cardBacks = [];
let movesCount = 0;
let timerInterval;

for(let j = 0; j <= 8; j+=8)
{
  for(let i = 0; i < 8; i++)
  {
    cardBacks[i+j] = icons[i];
  }
}

function shuffleAndAssignCardIcons() {
  shuffleArray(cardBacks);
  for(let i = 0; i < 16; i++)
  {
    $(cards[i]).append(`<i class="icon ${cardBacks[i]}"></i>`);
  }
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
  if ( parent.hasClass('success') ) return;
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
  setTimeout(checkIfEndGame, 600);
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

function checkIfEndGame() {
  if($('.success').length === 16)
  {
    constructEndGameStats();
    showEndScreen();    
  }
}
constructEndGameStats();
showEndScreen();

function showEndScreen() {
  $('.end-screen').addClass('end-screen-show');
    setTimeout(function(){
      $('.end-animation-container').prepend(successAnimation);
    }, 1000);
}

function constructEndGameStats() {
  let starsCount = $('.fa-star').filter("svg[data-prefix='fas']").length;
  let congrats = starsCount === 3 ? "Coool!" : starsCount === 2 ? "Good!" : starsCount === 1 ? "Nice!" : "Practise more!";
  let starsString = starsCount === 1 ? "Star" : "Stars";
  let endGameString = `<p class="end-game-stats">You finished with:</p>
                      <p class="end-game-stats">${movesCount} Moves</p>
                      <p class="end-game-stats">${starsCount} ${starsString}</p>
                      <p class="end-game-stats">After: ${$('.stats-timer').text()}</p>
                      <p class="end-game-stats">${congrats}</p>`;
  $('#congrats').after(endGameString);
}

function countMoves() {
  movesCount++;
  $('.moves-count').text(movesCount);
  starsRefresh();
}

function starsRefresh()
{
  if(movesCount === 15 || movesCount === 20 || movesCount === 25)
  {
    let stars = $('.fa-star').filter("svg[data-prefix='fas']");
    let star = stars.last();
    star.removeClass('fas');
    star.addClass('far');
  }
}

function startTimer() {
  if(timerInterval!=0) clearInterval(timerInterval);
  const start = new Date().getTime();
  timerInterval = setInterval(function() {

    let now = new Date().getTime();

    let distance = now - start;

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display time in specific format - MM:SS
    let minutesString, secondsString;
    if(minutes < 10)
    {
      minutesString = "0" + minutes.toString();
    }
    else
    {
      minutesString = minutes.toString();
    }
    if(seconds < 10)
    {
      secondsString = "0" + seconds.toString();
    }
    else
    {
      secondsString = seconds.toString();
    }

    $('.stats-timer').text(`${minutesString}:${secondsString}`);
  }, 1000);
}

function resetGame() {
  $('.stats-timer').text(`00:00`);
  startTimer();
  movesCount = 0;
  $('.moves-count').text(movesCount);
  $('.card').removeClass('success');
  $('.card').removeClass('flipped');
  $('.fa-star').filter("svg[data-prefix='far']")
               .removeClass('far')
               .addClass('fas');
  $('.card-back').removeClass('back-success');
  setTimeout(function() {
    $('.card-back').children().remove();
    shuffleAndAssignCardIcons();
  }, 500);
}

$('.btn-reset').on('click', function() {
  resetGame();
  $('.btn-reset').addClass('reset-click');
  setTimeout(function() {
    $('.btn-reset').removeClass('reset-click');
  }, 1000);
});

$('.btn-start').on('click', function() {
  $('.start-screen').addClass('start-screen-hide');
  resetGame();
});

$('.btn-play-again').on('click', function() {
  $('.end-screen').removeClass('end-screen-show');
  resetGame();
  setTimeout(function() {
    $('.end-animation-container').children().remove();
    $('.end-game-stats').remove();
  }, 500);
});