/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escapeXss = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const createTweetElement = function(tweet) {}
// Fake data taken from initial-tweets.json
let $tweet = `
<article class="tweets">
<header class="tweetHeader">
  <div class="tweeterProfile">
    <img class="avatar" src="${tweet.user.avatars}">
    <h5 class="tweeterName">${tweet.user.name}</h5>
  </div>
  <div class="tweetUser">
    <h4 class="userName">${tweet.user.handle}</h4>
  </div>
</header>
  <article class="tweetText">${escapeXss(tweet.content.text)}</article>
<hr>
<footer class="tweetFooter">
  <h6>${timeago.format(tweet.created_at)}</h6>
  <div>
    <i class="fa-solid fa-flag icons"></i>
    <i class="fa-sharp fa-solid fa-retweet icons"></i>
    <i class="fa-solid fa-heart icons"></i>
  </div>
</footer>
</article>`;

return $tweet;

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
const allTweets = [];
for (const tweet of tweets) {
  const $tweet = createTweetElement(tweet);
  allTweets.push($tweet)
}
}

const loadTweets = function() {
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
  // load existing tweet db
  loadTweets();
// Ajax handling of form submission
  $('.tweetForm').submit(function(event) {
    $('#tweet-error').hide();
    event.preventDefault();
    

    // error if tweet length is invalid, does not send ajax POST request
    const $tweetlength = $('#tweet-text').val().length
      if ($tweetlength === 0 || $tweetlength > 140){
        return alert('Field cannot be left empty, or you have more than 140 characters')
      }
// get new tweet data from text area and serialize it
const $tweet = $(this).serialize();

// new tweet data POST to /tweet route then call loadTweets to show onto page
$.ajax({
  type: "POST",
  url: "/tweets",
  data: $tweet,
  success: function(data) {
    loadTweets();
  }

});
// Clear text area after new tweet is posted to page
this.reset();
// restart counter at 140
$('.counter').text(140);
});

});