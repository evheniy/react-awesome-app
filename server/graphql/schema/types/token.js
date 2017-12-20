const debug = require('debug')('server:graphql:schema:mutation:token');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('yeps-graphql/graphql');

debug('TokenType created');

const TokenType = new GraphQLObjectType({
  name: 'TokenType',
  description: 'Token type',
  fields: {
    token: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = TokenType;
