const pluck = require('lodash/fp/pluck');
const isArray = require('lodash/isArray');

const extractSymbols = pluck('symbol');

const onData = ({ logger, publishQuotes }) => async (quotes = []) => {
  if (!isArray(quotes)) {
    logger.info(`Received invalid chunk:`);
    logger.info(quotes);
    return;
  }

  try {
    await publishQuotes(quotes);
    const tickers = extractSymbols(quotes);
    logger.info(`Processed: ${tickers.join(', ')}`);
  } catch (error) {
    logger.error(error);
  }
};

module.exports = {
  onData,
};
