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

describe('Logout testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
  });

  it('should test logout', async () => {
    const spy1 = spy();
    const spy2 = spy();
    const spy3 = spy();
    const spy4 = spy();

    await registration(server, spy1);

    const token = await login(server, spy2);

    await request(server)
      .del(`/tokens/${token}`)
      .set('x-access-token', token)
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        spy3();
      });

    await wrongToken(server, token, spy4);

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
    expect(spy3.calledOnce).to.be.true;
    expect(spy4.calledOnce).to.be.true;
  });
});
