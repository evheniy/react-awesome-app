const debug = require('debug')('server:router:user');
const { user } = require('../models');

/**
 * @apiDefine UnauthorizedError
 *
 * @apiError UnauthorizedError The token of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     Error 401: Unauthorized
 *     {
 *       "message": "Unauthorized"
 *     }
 */

/**
 * @apiDefine NotFoundError
 *
 * @apiError NotFoundError The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     Error 404: Not Found
 *     {
 *       "message": "Not Found"
 *     }
 */

/**
 * @api {get} users/:id Request User data
 * @apiSampleRequest /users/:id
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} X-Access-Token Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "TOKEN"
 *     }
 *
 * @apiExample {curl} Example usage:
 *     curl -H "X-Access-Token:TOKEN" http://localhost:3000/users/ID
 *
 * @apiSuccess {String} __v User record version.
 * @apiSuccess {String} id User ID.
 * @apiSuccess {String} email User email.
 * @apiSuccess {String} password  User password hash.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "__v": 0,
 *       "email": "test@test.com",
 *       "password": "$2a$10$rJ63Jj/O/Oy2DYJVlzrYJ.8L0X2BxKhDzABgWl7zmKXO8J7ZOGH4K",
 *       "_id": "5a2ba6827a8c3b1a09564aa7"
 *     }
 *
 * @apiUse UnauthorizedError
 * @apiUse NotFoundError
 */
module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: user');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);

  return ctx.response.resolve(user.user(id));
};
