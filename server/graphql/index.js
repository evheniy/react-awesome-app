const debug = require('debug')('server:graphql:index');
const Router = require('yeps-router');
const graphql = require('yeps-graphql');
const config = require('config');
const schema = require('./schema');

debug('GraphQL created');

const router = new Router();
const { graphiql } = config.graphql;

router.all('/graphql').then(graphql({
  schema,
  graphiql,
}));

module.exports = () => router.resolve();
