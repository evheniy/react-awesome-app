const debug = require('debug')('server:graphql:schema:mutation:index');
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require('yeps-graphql/graphql');

const TokenType = require('../types/token');
const UserType = require('../types/user');

debug('MutationType created');

const MutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutation type',
  fields: {
    register: {
      type: UserType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, { email, password }) {
        debug('Login Type');

        return { token: JSON.stringify({ email, password }) };
      },
    },
    login: {
      type: TokenType,
      args: {
        email: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, { email, password }) {
        debug('Login Type');

        return { token: JSON.stringify({ email, password }) };
      },
    },
    logout: {
      type: TokenType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, { token }) {
        debug('Login Type');

        return { token };
      },
    },
  },
});

module.exports = MutationType;
