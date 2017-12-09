const {
  expect,
  request,
  spy,
  createIndexFile,
  destroyIndexFile,
  createServer,
  destroyServer,
} = require('./hepler');

const env = process.env.NODE_ENV;

let server;

describe('Home page testing', () => {
  after(async () => {
    await createIndexFile();
  });

  beforeEach(async () => {
    server = await createServer();
    await createIndexFile();

    process.env.NODE_ENV = 'production';
  });

  afterEach(async () => {
    await destroyServer(server);
    await destroyIndexFile();

    process.env.NODE_ENV = env;
  });

  it('should test with index file', async () => {
    const s = spy();

    await request(server)
      .get('/')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });

  it('should test without index file', async () => {
    const s = spy();

    await destroyIndexFile();

    await request(server)
      .get('/')
      .send()
      .catch((err) => {
        expect(err).to.have.status(500);
        s();
      });

    await createIndexFile();

    expect(s.calledOnce).to.be.true;
  });

  it('should test redirection from "/index.html" to "/"', async () => {
    const s = spy();

    delete process.env.NODE_ENV;

    await request(server)
      .get('/index.html')
      .redirects(0)
      .send()
      .catch((err) => {
        expect(err).to.have.status(301);
        expect(err.response.headers.location).to.be.equal('/');
        s();
      });

    expect(s.calledOnce).to.be.true;
  });
});
