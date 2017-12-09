const debug = require('debug')('server:router:registration');
const { user } = require('../models');

/**
 * @apiDefine BadRequestError
 *
 * @apiError BadRequest Bad Request.
 *
 * @apiErrorExample Error-Response:
 *     Error 400: BadRequest
 *     {
 *       "message": "Bad Request"
 *     }
 */

/**
 * @api {post} users/ Request User registration
 * @apiSampleRequest /users/
 * @apiName PostUserRegistration
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam (User data) {String} email User email.
 * @apiParam (User data) {String} password User password.
 *
 * @apiSuccess {String} __v User record version.
 * @apiSuccess {String} id User ID.
 * @apiSuccess {String} email User email.
 * @apiSuccess {String} password  User password hash.
 *
 * @apiExample {curl} Example usage:
 *     curl --data "email=test@test.com&password=password" http://localhost:3000/users/
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
 * @apiUse BadRequestError
 */
module.exports = async (ctx) => {
  debug('URL: /users');
  debug('Route: registration');
  debug('Model: user');

  const { email, password } = ctx.request.body;
  debug('email:', email);
  debug('password:', password);

  return ctx.response.resolve(user.register(email, password));
};
