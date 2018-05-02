// Development specific configuration
// ==================================
const mongoHost = 'pu-dev-shard-00-00-4nodg.mongodb.net:27017,pu-dev-shard-00-01-4nodg.mongodb.net:27017,pu-dev-shard-00-02-4nodg.mongodb.net:27017'
module.exports = {
  port: process.env.PORT || 9103,
  mongo: {
    uri: 'mongodb://' + mongoHost + '/testing',
    prefix: 'pu_commerce_',
    options: {
      user: 'pudevelop',
      pass: 'xEbiMFBtX48ObFgC',
      ssl: true,
      replicaSet: 'pu-dev-shard-0',
      authSource: 'admin',
      autoIndex: false, // Don't build indexes
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 1000, // Reconnect every 500ms
      poolSize: 5 // Maintain up to 5 socket connections
    }
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
  plaid: {
    env: 'sandbox',
    publicKey: '5a537132a52c4ead4feab6358c62eb',
    clientId: '5a996f6b8d92392ce8b1fa38',
    secret: '6da166d1a6e3bfdc3032ce32b5924d'
  }
}
