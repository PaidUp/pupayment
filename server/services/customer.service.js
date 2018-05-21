import Service from './service'

class CusotmerService extends Service {
  createCustomer ({ description, email, paidupId, source }) {
    return this.stripe.createCustomer({ description, email, paidupId, source })
  }

  generateCardToken ({number, expMonth, expYear, cvc}) {
    return this.stripe.generateCardToken({number, expMonth, expYear, cvc})
  }

  associateCard ({customerId, token}) {
    return this.stripe.createSource(customerId, token)
  }

  associateBank ({customerId, publicToken, accountId}) {
    return this.plaid.exchangePublicToken(publicToken)
      .then(resExchangeToken => {
        return this.plaid.createStripeToken(resExchangeToken.access_token, accountId)
      }).then(resp => {
        return this.stripe.createSource(customerId, resp.stripe_bank_account_token)
      })
  }

  listCards (customerId) {
    return this.stripe.listCards(customerId)
  }

  deleteCard (customerId, cardId) {
    return this.stripe.deleteCard(customerId, cardId)
  }

  listBanks (customerId) {
    return this.stripe.listBanks(customerId)
  }

  deleteBank (customerId, bankId) {
    return this.stripe.deleteBank(customerId, bankId)
  }
}

let cusotmerService = new CusotmerService()

export default cusotmerService
