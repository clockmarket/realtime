const Redis = require('ioredis');
const isObject = require('lodash/isObject');
const { env } = require('./config');

/**
 * Channels
 */
const REALTIME_QUOTES_CHANNEL = 'realtime-quotes';

const createClient = () =>
  new Redis({
    dropBufferSupport: true,
    port: env.REDIS_PUBSUB_PORT,
    host: env.REDIS_PUBSUB_HOST,
    family: 4,
    password: env.REDIS_PUBSUB_PASSWORD,
    db: 0,
  });

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
      pipeline.publish(REALTIME_QUOTES_CHANNEL, value);
    }
  });

  await pipeline.exec();
};

module.exports = {
  createClient,
  publishQuotes,
};
