// script.js

$('.card').on('click', function(e) {
  console.log(e);
  let parent = $(e.target).parent();
  if ( parent.hasClass('flipped') ) {
			parent.removeClass('flipped');
		} else {
			parent.addClass('flipped');
		}
});
