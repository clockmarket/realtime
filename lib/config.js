const get = require('lodash/get');
const toNumber = require('lodash/toNumber');

console.log('Hii :)');

const CLOCKMARKET_ENVIRONMENT = get(
  process.env,
  'CLOCKMARKET_ENVIRONMENT',
  'development',
);

const sharedConfig = {
  CLOCKMARKET_ENVIRONMENT,
  IEX_CLOUD_SECRET_TOKEN: get(process.env, 'IEX_CLOUD_SECRET_TOKEN'),
  PORT: toNumber(get(process.env, 'PORT')),
  REDIS_URL: get(process.env, ['REDIS_URL']),
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
