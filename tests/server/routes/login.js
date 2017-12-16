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
} = require('./hepler');

let server;

describe('Login testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
    await removeUser({ email: 'test123111333555777@test.com' }).catch(e => e);
  });

  it('should test login', async () => {
    const spy1 = spy();
    const spy2 = spy();

    await registration(server, spy1);

    await request(server)
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
    const spy1 = spy();
    const spy2 = spy();

    await registration(server, spy1);

    await request(server)
      .post('/tokens')
      .send({ email: 'test123111333555777@test.com', password })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });

  it('should test login with wrong password', async () => {
    const spy1 = spy();
    const spy2 = spy();

    await registration(server, spy1);

    await request(server)
      .post('/tokens')
      .send({ email, password: '1234567' })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });
});
