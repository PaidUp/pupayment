import str from 'stripe'

export default class Stripe {
  constructor (sk) {
    this.stripe = str(sk)
  }

  createConnectAccount (payload) {
    return new Promise((resolve, reject) => {
      this.stripe.accounts.create(payload, (err, account) => {
        if (err) return reject(err)
        resolve(account)
      })
    })
  }

  createCustomer ({ description, email, paidupId, source }) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.create({
        description, email, source, meta: { paidupId }
      }, (err, customer) => {
        if (err) return reject(err)
        resolve(customer)
      })
    })
  }

  createSource (customerId, token) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.createSource(
        customerId,
        { source: token },
        (err, card) => {
          if (err) return reject(err)
          resolve(card)
        }
      )
    })
  }

  generateCardToken ({number, expMonth, expYear, cvc}) {
    return new Promise((resolve, reject) => {
      this.stripe.tokens.create({
        card: {
          'exp_month': expMonth,
          'exp_year': expYear,
          number,
          cvc
        }
      }, (err, token) => {
        if (err) return reject(err)
        resolve(token)
      })
    })
  }

  listCards (cusotmmerId) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.listCards(cusotmmerId, (err, cards) => {
        if (err) return reject(err)
        resolve(cards)
      })
    })
  }

  deleteCard (cusotmmerId, cardId) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.deleteCard(
        cusotmmerId, cardId, (err, confirmation) => {
          if (err) return reject(err)
          resolve(confirmation)
        }
      )
    })
  }

  listBanks (customerId) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.listSources(
        customerId,
        {object: 'bank_account'}, (err, bankAccounts) => {
          if (err) return reject(err)
          resolve(bankAccounts)
        })
    })
  }

  deleteBank (cusotmmerId, bankId) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.deleteSource(
        cusotmmerId, bankId, (err, confirmation) => {
          if (err) return reject(err)
          resolve(confirmation)
        }
      )
    })
  }

  refund (chargeId, reason, amount) {
    let params = {
      charge: chargeId,
      metadata: { comment: reason },
      refund_application_fee: true,
      reverse_transfer: true,
      amount: parseInt(amount * 100)
    }
    return new Promise((resolve, reject) => {
      this.stripe.refunds.create(params, function (err, refund) {
        if (err) {
          return reject(err)
        }
        return resolve(refund)
      })
    })
  }

  fetchTransfer (transferId) {
    return new Promise((resolve, reject) => {
      this.stripe.transfers.retrieve(transferId, {
        expand: ['destination_payment', 'balance_transaction', 'source_transaction']
      },
      (err, transfer) => {
        if (err) return reject(err)
        resolve(transfer)
      })
    })
  }

  fetchPayout (payoutId) {
    return new Promise((resolve, reject) => {
      this.stripe.payouts.retrieve(payoutId, {
        expand: ['balance_transaction', 'destination']
      },
      (err, payout) => {
        if (err) return reject(err)
        resolve(payout)
      })
    })
  }

  getEvent (secret, sig, body) {
    return this.stripe.webhooks.constructEvent(body, sig, secret)
  }
}
