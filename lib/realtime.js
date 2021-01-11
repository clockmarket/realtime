const ess = require('event-source-stream');
const handlers = require('./handlers');
const { env } = require('./config');

/**
 * Starts a 5s stream for the rest of the tickers
 */
const connectToIEXCloud = ({ logger, onData, options = {} }) => {
  logger.info(`Starting realtime stream...`);

  const stream = ess(
    `${env.IEX_CLOUD_SSE_URL}/last?token=${env.IEX_CLOUD_SECRET_TOKEN}&nosnapshot=true`,
    options,
  );

  stream.on('data', onData);

  return stream;
};

/**
 * Starts flow and fast streams
 */
const startStream = ({ logger, publishQuotes, ...options }) => {
  const onData = handlers.onData({ logger, publishQuotes });
  const streamOptions = { logger, onData, options };
  const stream = connectToIEXCloud(streamOptions);
  return stream;
};

module.exports = {
  startStream,
};
