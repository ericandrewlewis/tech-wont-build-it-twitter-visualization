const Twitter = require('twitter-lite');
const fs = require('file-system');
const _tweetIds = require('./tweet-ids.json');
const tweetIds = new Set(_tweetIds);

require('dotenv').config();

const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

(async () => {
  let tweets = [];
  console.log('Getting tweet data');
  try {
    let index = 0;
    while (index < tweetIds.length) {
      response = await client.get(`statuses/lookup`, {
        tweet_mode: 'extended',
        id: tweetIds.slice(index, )
      });
      index += 100;
    }
    for (let tweetId of tweetIds) {

      tweets.push({
        full_text: tweet.full_text,
        created_at: tweet.created_at,
        display_text_range: tweet.display_text_range,
        id_str: tweet.id_str,
        user: tweet.user.screen_name,
        user_profile_image: tweet.user.profile_image_url_https,
        retweet_count: tweet.retweet_count,
        favorite_count: tweet.favorite_count,
        coordinates: tweet.geo,
        profile_link_color: tweet.user.profile_link_color
      });
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1050);
      });
      process.stdout.write('.');
    }
  } catch(e) {
    console.error(e);
  }
  fs.writeFile(
    'tweets.js',
    "const data = " + JSON.stringify(tweets, null, 2),
    async function(err) {
    }
  );
})();
