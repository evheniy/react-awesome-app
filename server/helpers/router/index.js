const debug = require('debug')('server:helpers:router');
const accessWrapper = require('./access');

debug('Router wrapper helper created');

module.exports = {
  accessWrapper,
};
