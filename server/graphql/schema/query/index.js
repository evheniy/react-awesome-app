const debug = require('debug')('server:graphql:schema:query:index');
const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
} = require('yeps-graphql/graphql');

const UserType = require('../types/user');
const UsersType = require('../types/users');

const { user } = require('../../../models');

debug('QueryType created');

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Query type',
  fields: {
    users: {
      type: UsersType,
      args: {
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, { token }) {
        debug('User list');
        await token;
        const list = await user.list();
        debug(list);

        return list;
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
        token: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      async resolve(parent, { id, token }) {
        debug('User info');
        await token;
        const userInfo = await user.user(id);
        debug(userInfo);

        return userInfo;
      },
    },
  },
});

module.exports = QueryType;
