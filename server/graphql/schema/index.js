const debug = require('debug')('server:graphql:schema:index');

const { GraphQLSchema } = require('yeps-graphql/graphql');

const QueryType = require('./query');

debug('Schema created');

const schema = new GraphQLSchema({
  query: QueryType,
});

module.exports = schema;
