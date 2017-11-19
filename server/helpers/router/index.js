const debug = require('debug')('server:helpers:router');
const responseWrapper = require('./response');
const accessWrapper = require('./access');

debug('Router wrapper helper created');

module.exports = {
  responseWrapper,
  accessWrapper,
};
