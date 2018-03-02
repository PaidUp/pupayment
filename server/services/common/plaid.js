import plaid from 'plaid'

export default class Plaid {
  constructor ({clientId, secret, publicKey, env}) {
    this.plaidClient = new plaid.Client(clientId, secret, publicKey, plaid.environments[env])
  }

  exchangePublicToken (publicToken) {
    return this.plaidClient.exchangePublicToken(publicToken)
  }

  createStripeToken (accessToken, accountId) {
    return this.plaidClient.createStripeToken(accessToken, accountId)
  }
}
