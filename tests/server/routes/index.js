const {
  expect,
  request,
  spy,
  createIndexFile,
  destroyIndexFile,
  createServer,
  destroyServer,
} = require('./hepler');

let server;

describe('Server testing', () => {
  after(async () => {
    await createIndexFile();
  });

  beforeEach(async () => {
    server = await createServer();
    await createIndexFile();
  });

  afterEach(async () => {
    await destroyServer(server);
    await destroyIndexFile();
  });

  it('should test static server', async () => {
    const s = spy();

    const env = process.env.NODE_ENV;
    delete process.env.NODE_ENV;

    await request(server)
      .get('/index.html')
      .send()
      .then((res) => {
        expect(res).to.have.status(200);
        s();
      });

    process.env.NODE_ENV = env;

    expect(s.calledOnce).to.be.true;
  });

  it('should test 404 error page', async () => {
    const s = spy();

    await request(server)
      .get('/404')
      .send()
      .catch((err) => {
        expect(err).to.have.status(404);
        s();
      });

    expect(s.calledOnce).to.be.true;
  });
});
