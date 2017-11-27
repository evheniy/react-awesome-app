const debug = require('debug')('server:router:user');
const { user } = require('../models');

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {get} /users/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} email Firstname of the User.
 * @apiSuccess {String} password hash  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "test@test.com",
 *       "password": "password"
 *     }
 *
 * @apiUse UserNotFoundError
 */
module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: user');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);
  return user.user(id);
};
