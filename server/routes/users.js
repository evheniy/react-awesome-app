const debug = require('debug')('server:router:users');
const { user } = require('../models');

/**
 * @api {get} users/ Request User list
 * @apiSampleRequest /users/
 * @apiName GetUserList
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} x-access-token Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "TOKEN"
 *     }
 *
 * @apiSuccess {Object[]} users List of user profiles.
 *
 * @apiExample {curl} Example usage:
 *     curl -H "X-Access-Token:TOKEN" http://localhost:3000/users/
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "__v": 0,
 *       "email": "test@test.com",
 *       "password": "$2a$10$rJ63Jj/O/Oy2DYJVlzrYJ.8L0X2BxKhDzABgWl7zmKXO8J7ZOGH4K",
 *       "_id": "5a2ba6827a8c3b1a09564aa7"
 *     }]
 *
 * @apiUse UnauthorizedError
 */
module.exports = async (ctx) => {
  debug('URL: /users');
  debug('Route: users');
  debug('Model: user');

  return ctx.response.resolve(user.list());
};
