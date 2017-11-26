const debug = require('debug')('server:mongoose:user');
const mongoose = require('yeps-mongoose/mongoose');

const validator = require('../helpers').email;

const { Schema } = mongoose;

debug('Mongoose user model created');

const UserSchema = new Schema({
  email: {
    type: String,
    index: { unique: true },
    validate: {
      validator,
      message: 'Email should be valid.',
    },
    required: [true, 'Email is required.'],
  },
  password: {
    type: String,
    validate: {
      validator: password => password.length > 5,
      message: 'Password must be longer than 5 characters.',
    },
    required: [true, 'Password is required.'],
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;

