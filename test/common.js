let chai = require('chai')
let axios = require('axios')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
let should = chai.should()
let config = require('../server/config/environment').default
let token
var uuid = require('node-uuid')


let request = {
  account: {
    payload: {
      type: 'custom',
      country: 'US',
      email: 'test@test.com',
      business_name: 'John Doe',
      business_url: 'www.getpaidup.com',
      legal_entity: {
        business_name: 'test business name',
        business_tax_id: '',
        ssn_last_4: '0000',
        first_name: 'John',
        last_name: 'Doe',
        phone_number: '3017718888',
        type: 'company',
        dob: {
          day: 1,
          month: 1,
          year: 1980
        },
        address: {
          city: '',
          country: 'US',
          line1: 'test dir',
          line2: 'apto 494',
          postal_code: '60137',
          state: 'AK'
        }
      },
      external_account: {
        object: 'bank_account',
        account_number: '000123456789',
        routing_number: '110000000',
        country: 'US',
        currency: 'usd'
      }
    }
  },
  customer: {
    payload: {
      description: 'John Doe',
      email: 'test@test.com',
      paymentId: 'xxxxxxxx'
    }
  }
}

let results = {}

axios.post('https://devapi.getpaidup.com/api/v1/user/login/email', {
      email: 'test@getpaidup.com',
      password: 'test123',
      rememberMe: false
    })
    .then(function (response) {
      token = 'Bearer ' + response.data.token
    })
    .catch(function (error) {
      console.log(error);
    }); 

chai.use(chaiHttp)

exports.chai = chai
exports.server = server
exports.should = should
exports.token = function () { return token }
exports.results = results
exports.request = request
