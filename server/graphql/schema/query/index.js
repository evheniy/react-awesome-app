const debug = require('debug')('server:graphql:schema:query:index');
const { GraphQLNonNull, GraphQLObjectType, GraphQLID } = require('yeps-graphql/graphql');

const UserType = require('./user');
const UsersType = require('./users');

const { user } = require('../../../models');

debug('QueryType created');

const QueryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'QueryType',
  fields: {
    users: {
      type: UsersType,
      resolve() {
        debug('User list');

        const list = user.list();
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
      },
      resolve(parent, { id }) {
        debug('User info');

        const userInfo = user.user(id);
        debug(userInfo);

        return userInfo;
      },
    },
  },
});

module.exports = QueryType;
