$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').keydown(function() {
    const tweetLength = $(this).val().length;
    const counter = $(this).siblings().children()[1];

    $(counter).text(140 - tweetLength);

    if (tweetLength > 140) {
      $(counter).addClass('counterRed')
    } else {
      $(counter).removeClass('counterRed')
    }

  });

});