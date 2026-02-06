const axios = require("axios");

// Single joke
const SINGLE_JOKE_API = "https://official-joke-api.appspot.com/random_joke";

// Multiple jokes
const TEN_JOKES_API = "https://official-joke-api.appspot.com/random_ten";

const getRandomJoke = async () => {
  const { data } = await axios.get(SINGLE_JOKE_API);
  return formatJoke(data);
};

const getRandomTenJokes = async () => {
  const { data } = await axios.get(TEN_JOKES_API);
  return data.map(formatJoke);
};

const formatJoke = (joke) => {
  return `${joke.setup}\n${joke.punchline}`;
};

module.exports = {
  getRandomJoke,
  getRandomTenJokes
};
