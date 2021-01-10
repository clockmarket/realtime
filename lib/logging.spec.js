const isFunction = require('lodash/isFunction');
const { logger } = require('./logging');

describe('logging', () => {
  describe('logger', () => {
    it('should have proper logger methods', () => {
      expect(isFunction(logger.info)).toBe(true);
    });
  });
});
