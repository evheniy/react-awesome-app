/* eslint no-useless-escape: "off" */
const debug = require('debug')('server:helpers:email');

debug('Email validate helper created');

module.exports = (email) => {
  debug('Email', email);
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(email);
  debug('Valid:', isValid);

  return isValid;
};
