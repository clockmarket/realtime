const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const { env } = require('./config');
const { logger } = require('./logging');
const middlewares = require('./middlewares');
const { publishQuotes } = require('./cache');
const { startStream } = require('./realtime');

const app = express();

app.use(cors());
app.use(helmet());
app.use(middlewares.useLogging);
app.use(middlewares.useRateLimiter);

/**
 * Health check endpoint
 */
app.get('/health', (_req, res) => res.sendStatus(200));

/**
 * Environment info endpoint
 */
app.get('/info', (_req, res) => {
  res.status(200).json({ environment: env.CLOCKMARKET_ENVIRONMENT });
});

/**
 * Starts app listening
 */
const listen = () => {
  startStream({ json: true, logger, publishQuotes });
  app.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });
};

module.exports = {
  listen,
};
