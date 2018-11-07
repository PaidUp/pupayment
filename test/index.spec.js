process.env.NODE_ENV = 'test'
let axios = require('axios')
let common = require('./common')
let server = common.server
let chai = common.chai

function importTest(name, path) {
  describe(name, function () {
      require(path);
  });
}

describe('loading express', function () {
  before(function (done) { 
    setTimeout(() => {
      done()
    }, 3000)
  })

  after(function () {
    server().close()
  })

  describe('/GET root', () => {
    it('it should GET status 200', done => {
      chai
        .request(server())
        .get('/')
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })
  })

  importTest('account: /api/v1/payment/account ', './account');
  importTest('customer: /api/v1/payment/customer ', './customer');
})
