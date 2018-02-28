process.env.NODE_ENV = 'test'

let common = require('./common')
let server = common.server
let token = common.token
let chai = common.chai
let organizationResults = common.results.organization

it('POST# / create an order', done => {
  chai
    .request(server)
    .post('/api/v1/payment/account')
    .set('authorization', token)
    .send(common.request.account.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('id')
      done()
    })
})

