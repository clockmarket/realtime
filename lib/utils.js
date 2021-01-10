const getOr = require('lodash/fp/getOr');
const split = require('lodash/fp/split');
const pipe = require('lodash/fp/pipe');
const filter = require('lodash/fp/filter');
const isString = require('lodash/fp/isString');

const parseSymbols = pipe(getOr('', 'symbols'), split(','), filter(isString));

module.exports = {
  parseSymbols,
};
