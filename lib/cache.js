const Redis = require('ioredis');
const isObject = require('lodash/isObject');
const { env } = require('./config');

/**
 * Channels
 */
const IEX_CLOUD_LAST_CHANNEL = 'iex-cloud-last';

const createClient = () => new Redis(env.REDIS_URL);

/**
 * Redis client
 */
const client = createClient();

/**
 * Publishes quotes from a list
 * @param {[]} quotes
 */
const publishQuotes = async (quotes = []) => {
  const pipeline = await client.multi();

  quotes.forEach((quote) => {
    if (isObject(quote)) {
      const value = JSON.stringify(quote);
      pipeline.publish(IEX_CLOUD_LAST_CHANNEL, value);
    }
  });

  await pipeline.exec();
};

module.exports = {
  createClient,
  publishQuotes,
};
