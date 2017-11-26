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

describe('Registration testing', () => {
  beforeEach(async () => {
    server = await createServer();
  });

  afterEach(async () => {
    await destroyServer(server);
    await removeUser();
  });

  it('should test without error', async () => {
    const s = spy();

    await registration(server, s);

    expect(s.calledOnce).to.be.true;
  });

  it('should test empty email', async () => {
    const s = spy();

    await request(server)
      .post('/users')
      .send({ password })
      .catch((err) => {
        expect(err).to.have.status(400);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test wrong email', async () => {
    const s = spy();

    await request(server)
      .post('/users')
      .send({ password, email: 'test' })
      .catch((err) => {
        expect(err).to.have.status(400);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test empty password', async () => {
    const s = spy();

    await request(server)
      .post('/users')
      .send({ email })
      .catch((err) => {
        expect(err).to.have.status(400);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test wrong password', async () => {
    const s = spy();

    await request(server)
      .post('/users')
      .send({ email, password: '12' })
      .catch((err) => {
        expect(err).to.have.status(400);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test existing user', async () => {
    const spy1 = spy();
    const spy2 = spy();

    await registration(server, spy1);

    await request(server)
      .post('/users')
      .send({ email, password })
      .catch((err) => {
        expect(err).to.have.status(400);
        spy2();
      });

    expect(spy1.calledOnce).to.be.true;
    expect(spy2.calledOnce).to.be.true;
  });
});
