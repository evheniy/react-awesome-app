const debug = require('debug')('server:models:user:patch');
const { User } = require('../../mongoose');
const { password: { cryptPassword } } = require('../../helpers');

module.exports = async (id, body, token) => {
  debug('Update user');
  debug('id:', id);
  debug('Params:', body);
  debug('Saved data:', token);

  try {
    if (id !== token._id) {
      throw new Error('You can update only own record!');
    }

    const user = await User.findById(id);
    debug('User:', user);

    if (body.password) {
      Object.assign(body, { password: await cryptPassword(body.password) });
    }

    Object.assign(user, body);
    debug('User updated:', user);

    await user.save();

    debug('User saved:', user);

    return Promise.resolve(user);
  } catch (err) {
    debug('Error:', err.message);

    const error = new Error();
    error.code = 400;

    return Promise.reject(error);
  }
};
