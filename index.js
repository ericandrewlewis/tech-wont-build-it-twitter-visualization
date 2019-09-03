const Twitter = require('twitter-lite');
require('dotenv').config();

const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// client
//   .get("account/verify_credentials")
//   .then(results => {
//     console.log("results", results);
//   })
//   .catch(console.error);

(async () => {
  let results;
  try {
    results = await client
    .post("tweets/search/fullarchive/dev.json", {
      query: "#TechWontBuildIt"
    });
  } catch(e) {
    console.error(e);
  }
  console.log(results);



})();
