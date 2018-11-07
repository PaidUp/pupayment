// Development specific configuration
// ==================================
module.exports = {
  port: process.env.PORT || 9103,
  mongo: {
    url: 'mongodb+srv://pudevelop:xEbiMFBtX48ObFgC@pu-dev-4nodg.mongodb.net/testing?retryWrites=true',
    prefix: 'pu_payment_'
  },
  logger: {
    projectId: 'gothic-talent-192920',
    logName: 'pu-product-test-log',
    metadata: {resource: {type: 'global'}}
  },
  api: {
    organization: {
      url: 'https://devapi.getpaidup.com/api/v1/organization'
    }
  },
  stripe: {
    key: 'sk_test_wE4QBHe2SZH9wZ6uMZliup0g',
    webhooks: {
      transfers: 'whsec_6H1Bc9BPK0hLYcy45JRKCyc9Vmo82hCh',
      payouts: 'whsec_ixJiCY3fIr4UE3DyaEc70YPuCWrtzUjP'
    }
  },
  plaid: {
    env: 'sandbox',
    publicKey: '5a537132a52c4ead4feab6358c62eb',
    clientId: '5a996f6b8d92392ce8b1fa38',
    secret: '6da166d1a6e3bfdc3032ce32b5924d'
  }
}
