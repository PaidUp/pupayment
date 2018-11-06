import _ from 'lodash'
import develop from './develop'
import production from './production'
import test from './test'
import stage from './stage'

const envs = {
  develop,
  production,
  test,
  stage
}

// All configurations will extend these options
// ============================================
let all = {
  port: process.env.PORT || 9004,
  mongo: {
    url: 'mongodb+srv://pudevelop:xEbiMFBtX48ObFgC@pu-dev-4nodg.mongodb.net/develop?retryWrites=true',
    prefix: 'pu_payment_'
  },
  auth: {
    credential: 'puproduct-secret',
    host: 'redis-13835.c16.us-east-1-3.ec2.cloud.redislabs.com',
    port: 13835,
    key: 'JF06f7FJjTDkNOcM1sdywWw5CZBHW4Jy'
  },
  logger: {
    projectId: 'gothic-talent-192920',
    logName: 'pu-product-dev-log',
    metadata: {resource: {type: 'global'}}
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

if (process.env.NODE_ENV) {
  all = _.merge(
    all,
    envs[process.env.NODE_ENV] || {})
}

// Export the config object based on the NODE_ENV
// ==============================================
export default all
