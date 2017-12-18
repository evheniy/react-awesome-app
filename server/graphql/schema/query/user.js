const debug = require('debug')('server:graphql:schema:query:user');
const { GraphQLObjectType, GraphQLString } = require('yeps-graphql/graphql');

debug('UserType created');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'User type',
  fields: {
    id: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
  },
});

module.exports = UserType;
