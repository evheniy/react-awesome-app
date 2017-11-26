const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');
const { spy } = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const yeps = require('yeps-server');
const logger = require('yeps-logger/logger');
const redis = require('yeps-redis/redis');

const app = require('../../../server');

const { User } = require('../../../server/mongoose');

chai.use(chaiHttp);

const { expect, request } = chai;

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

const index = resolve(__dirname, '..', '..', '..', 'dist', 'index.html');

const [email, password] = ['test@test.com', 'password'];

const createIndexFile = () => writeFile(index, 'test');

const destroyIndexFile = () => unlink(index);

const createServer = () => yeps.createHttpServer(app);

const destroyServer = server => new Promise(r => server.close(r));

const removeUser = (userEmail = email) => User.findOneAndRemove({ email: userEmail });

const registration = async (server, s) => {
  await request(server)
    .post('/users')
    .send({ email, password })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body._id).to.exist;
      s();
    });
};

const login = async (server, s) => {
  const token = await request(server)
    .post('/tokens')
    .send({ email, password })
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body.token).to.exist;
      s();
      return res.body.token;
    });

  return token;
};

const wrongToken = async (server, token, s) => {
  await request(server)
    .get('/users')
    .set('x-access-token', token)
    .send()
    .catch((err) => {
      expect(err).to.have.status(401);
      s();
    });
};

const checkUser = async (server, id, token, s) => {
  await request(server)
    .get(`/users/${id}`)
    .set('x-access-token', token)
    .send()
    .then((res) => {
      expect(res).to.have.status(200);
      expect(res.body._id).to.exist;
      s();
    });
};

logger.info = text => text;
logger.error = text => text;

module.exports = {
  expect,
  request,
  spy,
  createIndexFile,
  destroyIndexFile,
  createServer,
  destroyServer,
  email,
  password,
  removeUser,
  registration,
  login,
  wrongToken,
  checkUser,
  redis,
};
