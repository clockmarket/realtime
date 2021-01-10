const Pino = require('express-pino-logger');
const RedisStore = require('rate-limit-redis');
const RateLimit = require('express-rate-limit');
const { logger } = require('./logging');
const { createClient } = require('./cache');

const useLogging = Pino({ logger });

const useRateLimiter = new RateLimit({
  store: new RedisStore({ client: createClient() }),
  max: 30,
  delayMs: 0,
});

module.exports = {
  useLogging,
  useRateLimiter,
};
