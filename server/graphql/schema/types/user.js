const debug = require('debug')('server:graphql:schema:query:user');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('yeps-graphql/graphql');

debug('UserType created');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  description: 'User type',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

module.exports = UserType;
