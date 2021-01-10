const { logger } = require('./lib/logging');
const { listen } = require('./lib/server');

process.on('uncaughtException', (error) => {
  logger.error(error);
  process.exit(1);
});

listen();
