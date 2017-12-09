const debug = require('debug')('server:router:patch');
const { user } = require('../models');

/**
 * @api {patch} users/:id Request User editing
 * @apiSampleRequest /users/:id
 * @apiName PatchUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} X-Access-Token Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "X-Access-Token": "TOKEN"
 *     }
 *
 * @apiParam (User data) {String} password User password.
 *
 * @apiExample {curl} Example usage:
 *     curl -H "X-Access-Token:TOKEN" -X PATCH --data='{"password":"password"}' http://localhost:3000/users/ID
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
 * @apiUse BadRequestError
 */
module.exports = async (ctx) => {
  debug('URL: /users/:id');
  debug('Route: patch');
  debug('Model: user');

  const { id } = ctx.request.params;
  debug('User id:', id);

  const { body } = ctx.request;
  debug('body:', body);

  const { token } = ctx.request;
  debug('token:', token);

  return ctx.response.resolve(user.patch(id, body, token));
};
