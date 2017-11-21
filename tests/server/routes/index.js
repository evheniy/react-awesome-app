const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const yeps = require('yeps-server');
const redis = require('yeps-redis/redis');
const logger = require('yeps-logger/logger');
const mongoose = require('mongoose');

const fs = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const { User } = require('../../../server/mongoose');

const app = require('../../../server');

chai.use(chaiHttp);

const { expect } = chai;
let server;

const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);
const index = resolve(__dirname, '..', '..', '..', 'dist', 'index.html');

describe('Server testing', () => {
  logger.info = text => text;
  logger.error = text => text;

  beforeEach(async () => {
    server = yeps.createHttpServer(app);
    await writeFile(index, 'test');
  });

  afterEach(async () => {
    server.close();
    await User.findOneAndRemove({ email: 'test@test.com' });
    await User.findOneAndRemove({ email: 'test1@test.com' });
    await unlink(index);
  });

  after(() => {
    redis.disconnect();
    mongoose.connection.close();
  });

  const email = 'test@test.com';
  const password = 'password';

  const registration = async (spy) => {
    await chai.request(server)
      .post('/users')
      .send({ email, password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy();
      });
  };

  const login = async (spy) => {
    const token = await chai.request(server)
      .post('/tokens')
      .send({ email, password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        spy();
        return res.body.token;
      });

    return token;
  };

  const wrongToken = async (token, spy) => {
    await chai.request(server)
      .get('/users')
      .set('x-access-token', token)
      .send()
      .catch((err) => {
        expect(err).to.have.status(401);
        spy();
      });
  };

  const checkUser = async (id, token, spy) => {
    await chai.request(server)
      .get(`/users/${id}`)
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy();
      });
  };

  it('should test static server', async () => {
    const spy = sinon.spy();
    const env = process.env.NODE_ENV;
    delete process.env.NODE_ENV;

    await chai.request(server)
      .get('/index.html')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        spy();
      });

    process.env.NODE_ENV = env;

    expect(spy.calledOnce).to.be.true;
  });

  it('should test main router', async () => {
    const spy = sinon.spy();
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    await chai.request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        spy();
      });

    process.env.NODE_ENV = env;
    expect(spy.calledOnce).to.be.true;
  });

  it('should test main router with error', async () => {
    const spy = sinon.spy();
    const env = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    unlink(index);

    await chai.request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        spy();
      });

    writeFile(index, 'test');

    process.env.NODE_ENV = env;
    expect(spy.calledOnce).to.be.true;
  });

  it('should test 404 error page', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .get('/404')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration', async () => {
    const spy = sinon.spy();

    await registration(spy);

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration with empty email', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .post('/users')
      .send({ password })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration with wrong email', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .post('/users')
      .send({ password, email: 'test' })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration with empty password', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .post('/users')
      .send({ email })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration with wrong password', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .post('/users')
      .send({ email, password: '12' })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test registration with existing user', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    await registration(spy1);

    await chai.request(server)
      .post('/users')
      .send({ email, password })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });

  it('should test login', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    await registration(spy1);

    await chai.request(server)
      .post('/tokens')
      .send({ email, password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });

  it('should test login with wrong email', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    await registration(spy1);

    await chai.request(server)
      .post('/tokens')
      .send({ email: 'test123@test.com', password })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });

  it('should test login with wrong password', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();

    await registration(spy1);

    await chai.request(server)
      .post('/tokens')
      .send({ email, password: '1234567' })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });

  it('should test users list with empty token', async () => {
    const spy = sinon.spy();

    await chai.request(server)
      .get('/users')
      .send()
      .catch((err) => {
        expect(err).to.have.status(401);
        spy();
      });

    expect(spy.calledOnce).to.be.true;
  });

  it('should test users list with wrong token in header', async () => {
    const spy = sinon.spy();

    await wrongToken('test', spy);

    expect(spy.calledOnce).to.be.true;
  });

  it('should test users list with token', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);

    await chai.request(server)
      .get('/users')
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('array');
        expect(res.body).to.not.empty;
        spy3();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
  });

  it('should test logout', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);

    await chai.request(server)
      .del(`/tokens/${token}`)
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        spy3();
      });

    await wrongToken(token, spy4);

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
  });

  it('should test user', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(user._id, token, spy3);

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
  });

  it('should test user update', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(user._id, token, spy3);

    await chai.request(server)
      .patch(`/users/${user._id}`)
      .set('x-access-token', token)
      .send({ password: '123456' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy4();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
  });

  it('should test user update email', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(user._id, token, spy3);

    await chai.request(server)
      .patch(`/users/${user._id}`)
      .set('x-access-token', token)
      .send({ email: 'test@test.com' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy4();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
  });

  it('should test user update with wrong id', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();

    await registration(spy1);

    const token = await login(spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(user._id, token, spy3);

    await chai.request(server)
      .patch('/users/123')
      .set('x-access-token', token)
      .send()
      .catch((err) => {
        expect(err).to.have.status(400);
        spy4();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
  });

  it('should test user updates other user', async () => {
    const spy1 = sinon.spy();
    const spy2 = sinon.spy();
    const spy3 = sinon.spy();
    const spy4 = sinon.spy();
    const spy5 = sinon.spy();

    let user2;

    await registration(spy1);

    // create new user
    await chai.request(server)
      .post('/users')
      .send({ email: 'test1@test.com', password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        user2 = res.body;
        spy2();
      });

    const token = await login(spy3);
    const user = JSON.parse(await redis.get(token));

    await checkUser(user._id, token, spy4);

    await chai.request(server)
      .patch(`/users/${user2._id}`)
      .set('x-access-token', token)
      .send({ password: 'password2' })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy5();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
    expect(spy5.calledOnce).to.be.true;
  });
});
