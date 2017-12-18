const debug = require('debug')('server:graphql:schema:query:user');
const { GraphQLList } = require('yeps-graphql/graphql');

const UserType = require('./user');

debug('UsersType created');

const UsersType = new GraphQLList(UserType);

module.exports = UsersType;
