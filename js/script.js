// script.js

const card = document.querySelector('.card');
let playing = false;

card.addEventListener('click', function(e) {
  console.log(e.target);
  if(playing) return;
  console.log('hello');
  playing = true;
  anime({
    targets: card,
    scale: [{value: 1}, {value: 1.0}, {value: 1, delay: 0}],
    rotateY: {value: '+=180', delay: 100},
    easing: 'easeInOutSine',
    duration: 200,
    complete: function(anime){
       playing = false;
    }
  });
});
