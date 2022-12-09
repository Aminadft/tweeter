/*
 * Client-side JS logic(tweets) goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweetObj) {
const name = tweetObj.user.name;
  const avatar = tweetObj.user.avatars;
  const handle = tweetObj.user.handle;
  const text = tweetObj.content.text;
  const date = timeago.format(tweetObj.created_at);

  const $tweet = `<article>
  <header>
    <div>
      <img src="${avatar}">
     <span>${name}</span>
    </div>
    <div>
      <i><strong>${handle}</strong></i>
    </div>
  </header>
  <p>${escape(text)}</p>
  <footer>
    <hr>
    <div>
      <i>${date}</i>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        <i class="likes">1</i>
      </div>
    </div>
  </footer>
</article>`;
  return $tweet;

}

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
$("#tweets-container").html('')
for (const tweet of tweets) {
  const $tweet = createTweetElement(tweet);
  $("#tweets-container").append($tweet)
}
}


const loadTweets = function() {
  // gets the tweet db from /tweets route and calls renderTweets to post on to page
  $.ajax({
    type: "GET",
    url: "/tweets",
    success: function(tweet) {
      renderTweets(tweet);
    }
  });
  return;
};

$(document).ready(function() {

  // Load tweets on page load

  loadTweets();

// new tweet 
$(`.newTweet`).click(function(event) { // should be in a function
   event.preventDefault();
    const newTweetSection = $('.new-tweet')
    if (newTweetSection.is(':hidden')){
      newTweetSection.slideDown('fast')
      newTweetSection.find('#tweet-text').focus()
    }
    $('#tweet-text').focus();
  });
  
  // nav arrow hide/show new tweet section
  $('.next').click(function(event) {
    event.preventDefault();
    const newTweetSection = $('.new-tweet')
    console.log(newTweetSection)

    if (newTweetSection.is(':visible')){
      newTweetSection.slideUp('fast')
    } else {
      newTweetSection.slideDown('slow')
      newTweetSection.find('#tweet-text').focus()
    }

  });
  
  // scroll button at the botton will appear when window scrolls down
  $(window).scroll(function() {
    if (window.pageYOffset > 100) {
      $('.scrollUp').addClass('active');
    } else {
      $('.scrollUp').removeClass('active');
    }
  });

  // scroll when clicked will scroll page up to text area
  $('.scrollUp').click(function(event) {
    event.preventDefault();
    const newTweetSection = $('.new-tweet')
    if (newTweetSection.is(':hidden')){
      newTweetSection.slideDown('fast')
      newTweetSection.find('#tweet-text').focus()
    }
    $('#tweet-text').focus();

  });


  // AJAX handling of form submission

  $(`.tweetForm`).submit(function(event) {

    $('#tweet-error').hide();
    //prevents page from reloading
    event.preventDefault();
    

    // error if tweet length is invalid, does not send ajax POST request
    if (!$('#tweet-text').val()) {
      $('#error-msg-null').slideDown("slow", () => {});
      return setTimeout(() => $('.errors').slideUp(), 5000);
    }
  
    if ($('#tweet-text').val().length > 140) {
      $('#error-msg-length').slideDown("slow", () => {});
      return setTimeout(() => $('.errors').slideUp(), 5000);
    }
  
  // get new tweet data from text area and serialize it
    const result = $('.tweetForm').serialize();
    $.post('/tweets', result, () => {
      $('#tweet-text').val('');
      $('.counter').text(140);
  
      loadTweets();
    });
  
  });
})
   



// // new tweet data POST to /tweet route then call loadTweets to show onto page
// $.ajax({
//   type: "POST",
//   url: "/tweets",
//   data: $tweet,
//   success: function(data) {
//     loadTweets();
//   }

// });
// // Clear text area after new tweet is posted to page
// this.reset();
// // restart counter at 140
// $('.counter').text(140);
// });
