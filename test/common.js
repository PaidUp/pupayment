let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server/app').default
let should = chai.should()
let config = require('../server/config/environment').default
let token = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImNvbnRhY3RzIjpbXSwicm9sZXMiOlsicGFyZW50Il0sIl9pZCI6IjVhODMyMTlkMTc1Zjk1MGU3NjlkYmViMyIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ0eXBlIjoiY3VzdG9tZXIiLCJzYWx0IjoienhvYU1LbjY1TzIwWE1LY0x3aU0yQT09IiwiaGFzaGVkUGFzc3dvcmQiOiJKWWJaNU5wbnJqZTFEaUdMcmhrUm9DTDM4cW5RTVFOKzZRWTJka0pnNy9QMlBVeWZIRkozbllMdlZ5QjhiYXNqb3N2T2pseU9xNlB5WlFIZHU4cVQ5QT09IiwiX192IjowfSwiaWF0IjoxNTE4NTQzMjg3LCJleHAiOjM0MTA3MDMyODd9.pRQNdpZMVh0GRVGyj8Yxh2d_bhwi66hKj49iGChmIuE'
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

chai.use(chaiHttp)

exports.chai = chai
exports.server = server
exports.should = should
exports.token = token
exports.results = results
exports.request = request
