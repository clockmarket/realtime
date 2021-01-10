const get = require('lodash/get');
const toNumber = require('lodash/toNumber');

const CLOCKMARKET_ENVIRONMENT = get(
  process.env,
  'CLOCKMARKET_ENVIRONMENT',
  'development',
);

const sharedConfig = {
  CLOCKMARKET_ENVIRONMENT,
  IEX_CLOUD_SECRET_TOKEN: get(process.env, 'IEX_CLOUD_SECRET_TOKEN'),
  PORT: toNumber(get(process.env, 'PORT', 3002)),
  REDIS_PUBSUB_HOST: get(process.env, 'REDIS_PUBSUB_HOST'),
  REDIS_PUBSUB_PASSWORD: get(process.env, 'REDIS_PUBSUB_PASSWORD'),
  REDIS_PUBSUB_PORT: get(process.env, 'REDIS_PUBSUB_PORT'),
};

const development = {
  ...sharedConfig,
  IEX_CLOUD_SSE_URL: 'https://sandbox-sse.iexapis.com/stable',
};

const production = {
  ...sharedConfig,
  IEX_CLOUD_SSE_URL: 'https://sse.iexapis.com/stable',
};

const environments = {
  development,
  production,
};

const env = get(environments, CLOCKMARKET_ENVIRONMENT);

module.exports = {
  env,
};
