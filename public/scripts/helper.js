//=============Tweet Handling =====================================================
const loadTweets = function (action) {
  //GET the latest Tweet
  $.ajax("/tweets/")
    .then(res => {
      action(res);
    });
};

const createTweetElement = function (post) {
  // Not a good way of doing it, should break down into chunks

  const $tweet = $(`
<article class="tweet">
<header>
<span><img src=${post.user.avatars}><p>${post.user.name}</p></span>
<span class="hide">${post.user.handle}</span>
</header>
<p class='tweet-contents'>${escapeStr(post.content.text)}</p>
<footer>
<span>${moment(post.created_at).fromNow()}</span>
<span class="icons">
  <i class="fas fa-flag hoverBtn" title="Flag Inappropriate"></i>
  <i class="fas fa-retweet hoverBtn" title="Re-Twit"></i>
  <i class="fas fa-heart hoverBtn" title="Heart it Up"></i>
</span>
</footer>
</article>
`);

  $('#tweets-container').prepend($tweet);
};

const renderTweets = function (inputData) {
  // empty then in sectoin
  $('#tweets-container').empty();
  // Reverses JSON to give newest first (should be switchable)
  const revData = inputData; //.reverse()
  for (post of revData) {
    createTweetElement(post);
  }
};

const fetchAndUpdateAll = () => loadTweets(renderTweets);

const validateAndSubmit = function () {

  $("#inputError").hide('slow');
  const input = $("#tweet-text").val();

  //Validate Before Submission
  if (input === "") {
    // Must have something to input
    $('#inputError label').text("Womp womp, Tweets cannot be empty");
    $('#inputError').show('slow');
  } else if (input.length > 140) {
    //Max Character Exceeded
    $('#inputError label').text("Whoa now! Try keep it to 140 characters or less");
    $('#inputError').show('slow');
  } else {
    //POST and Tidy Up
    $.ajax({
      method: 'POST',
      url: "/tweets/",
      data: $('form').serialize()
    })
      .then(resetTextBox())
      .then(() => loadTweets(renderTweets));
  }
};

const escapeStr = function (str) {
  // Cross Site Script Couter-measure
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

//==================== Page Handling ==========================================
const initializePage = function () {
  //Hide New Tweet area and Input Error Message
  $("#inputError").hide();
  $(".new-tweet").hide();
}

const resetTextBox = () => {
  //Clear Text Box after post and reset counter
  $('#tweet-text').val('');
  $('output.counter').val(140);
};

const rtnToTopTrigger = function () {
  // Show/Hide Button on scroll Button
  $(window).scroll(function () {
    if ($(window).scrollTop() > 50) {
      $("#topButton").show("slow");
    } else {
      $("#topButton").hide("slow");
    }
  });
}

const closeTweetInputScroll = function () {
  // Closes Tweet Box if you scroll out of view (approx 2-3 tweets deep)
  $(window).scroll(function () {
    if ($(window).scrollTop() > 700) {
      $(".new-tweet").hide()
    }
  });
}

//==================== Click Actions ==========================================
const toggleTweetInputClick = function () {
  $('.navButton').on('click', () => {
    $(".new-tweet").animate({
      height: "toggle",
      opacity: "toggle"
    }, {
      duration: "slow"
    });
    $('textarea').focus();
  });
}
// poast tweet function
const postTweetClick = function () {
  $('form button').on('click', event => {
    event.preventDefault();
    validateAndSubmit();
  });
}

const rtnToTopClick = function () {
  //Rtn to Top on Click
  $('#topButton').on('click', () => {
    $('html, body').animate({ scrollTop: 0 }, '300');
  });
}