process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let chai = common.chai

it('POST# / create an account', done => {
  chai
    .request(server)
    .post('/api/v1/payment/account')
    .set('authorization', common.token())
    .send(common.request.account.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('id')
      common.results.account = res.body
      done()
    })
})

