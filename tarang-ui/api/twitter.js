const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

export default async (req, res) => {
  try {
    const tweets = await twitterClient.v2.search('natural disaster', {
      max_results: 10,
    });
    res.status(200).json({ tweets: tweets.data.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
