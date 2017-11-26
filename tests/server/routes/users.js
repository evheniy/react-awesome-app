const {
  expect,
  request,
  spy,
  createServer,
  destroyServer,
  removeUser,
  registration,
  login,
  wrongToken,
} = require('./hepler');

let server;

describe('User list testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
  });

  it('should test with empty token', async () => {
    const s = spy();

    await request(server)
      .get('/users')
      .send()
      .catch((err) => {
        expect(err).to.have.status(401);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test with wrong token in header', async () => {
    const s = spy();

    await wrongToken(server, 'test', s);

    expect(s.calledOnce).to.be.true;
  });

  it('should test with token', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);

    await request(server)
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
});
