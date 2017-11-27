const {
  expect,
  request,
  spy,
  createServer,
  destroyServer,
  removeUser,
  registration,
  login,
  checkUser,
  redis,
} = require('./hepler');

let server;

describe('User info testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
  });

  it('should test user', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);
    const user = JSON.parse(await redis.get(token));

    await checkUser(server, user._id, token, spy3);

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
  });

  it('should test user', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);

    await request(server)
      .get('/users/test')
      .set('x-access-token', token)
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        spy3();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
  });
});
