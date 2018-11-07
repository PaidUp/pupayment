let common = require('./common')
let customerService = require('../server/services/customer.service').default
let server = common.server
let chai = common.chai

it('POST# / create a customer', done => {
  chai
    .request(server())
    .post('/api/v1/payment/customer')
    .set('authorization', common.token())
    .send(common.request.customer.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('id')
      common.results.account = res.body
      done()
    })
})

it('POST# / create a customer with credit card', done => {
  customerService.generateCardToken({number: '4111111111111111', expMonth: '12', expYear: '2021', cvc: '123'}).then(tk => {
    common.request.customer.payload.source = tk.id
    chai
    .request(server())
    .post('/api/v1/payment/customer')
    .set('authorization', common.token())
    .send(common.request.customer.payload)
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('id')
      common.results.account2 = res.body
      done()
    })
  })
  
})

it('POST# / create credit card', done => {
  customerService.generateCardToken({number: '4111111111111111', expMonth: '12', expYear: '2022', cvc: '123'}).then(tk => {
    chai
    .request(server())
    .post('/api/v1/payment/customer/card')
    .set('authorization', common.token())
    .send({
      customerId: common.results.account2.id,
      token: tk.id
    })
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('id')
      common.results.card = res.body
      done()
    })
  })
})

it('GET# / list customer cards', done => {
  chai
    .request(server())
    .get(`/api/v1/payment/customer/${common.results.account2.id}/cards`)
    .set('authorization', common.token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('object')
      res.body.data.should.to.be.an('array')
      done()
    })
})

it('PUT# / remove a card', done => {
  chai
    .request(server())
    .put(`/api/v1/payment/customer/card`)
    .set('authorization', common.token())
    .send({
      customerId: common.results.account2.id,
      cardId: common.results.card.id
    })
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('deleted')
      res.body.deleted.should.equal(true)
      done()
    })
})

it('GET# / list customer banks', done => {
  chai
    .request(server())
    .get(`/api/v1/payment/customer/${common.results.account2.id}/banks`)
    .set('authorization', common.token())
    .end((err, res) => {
      res.should.have.status(200)
      res.body.should.have.property('object')
      res.body.data.should.to.be.an('array')
      done()
    })
})
