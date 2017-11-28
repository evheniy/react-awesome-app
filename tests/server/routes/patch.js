const {
  expect,
  request,
  spy,
  createServer,
  destroyServer,
  email,
  password,
  removeUser,
  registration,
  login,
  checkUser,
  redis,
} = require('./hepler');

let server;

describe('User update testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
    await removeUser('test1@test.com');
  });

  it('should test user update', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();
    const spy5 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy3);

    await request(server)
      .patch(`/users/${user._id}`)
      .set('x-access-token', token)
      .send({ password: '123456' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy4();
      });

    await request(server)
      .post('/tokens')
      .send({ email, password: '123456' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.token).to.exist;
        spy5();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
    expect(spy5.calledOnce).to.be.true;
  });

  it('should test user update with old password', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();
    const spy5 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy3);

    await request(server)
      .patch(`/users/${user._id}`)
      .set('x-access-token', token)
      .send({ password: '123456' })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        spy4();
      });

    await request(server)
      .post('/tokens')
      .send({ email, password })
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

  it('should test user update email', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy3);

    await request(server)
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
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy3);

    await request(server)
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
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();
    const spy5 = spy();

    let user2;

    await registration(server, spy1);

    // create new user
    await request(server)
      .post('/users')
      .send({ email: 'test1@test.com', password })
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        user2 = res.body;
        spy2();
      });

    const token = await login(server, spy3);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy4);

    await request(server)
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
