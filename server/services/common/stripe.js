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

  fetchBalanceHistory (stripeAccount, payout, startingAfter) {
    return new Promise((resolve, reject) => {
      let params = {
        payout,
        limit: 100,
        expand: ['data.source.source_transfer.source_transaction']
      }
      if (startingAfter) params.starting_after = startingAfter
      this.stripe.balance.listTransactions(
        params,
        {stripe_account: stripeAccount},
        (err, transfer) => {
          if (err) return reject(err)
          resolve(transfer)
        })
    })
  }

  fetchPayouts ({stripeAccount, limit = 10, startingAfter, endingBefore}) {
    return new Promise((resolve, reject) => {
      this.stripe.payouts.list({
        created: { gte: 1527811200 },
        limit,
        starting_after: startingAfter,
        ending_before: endingBefore,
        expand: ['data.balance_transaction', 'data.destination']
      },
      {stripe_account: stripeAccount},
      (err, payouts) => {
        if (err) return reject(err)
        resolve(payouts)
      })
    })
  }

  getEvent (secret, sig, body) {
    return this.stripe.webhooks.constructEvent(body, sig, secret)
  }

  verifySource (customerId, sourceId, amounts) {
    return new Promise((resolve, reject) => {
      this.stripe.customers.verifySource(customerId, sourceId,
        { amounts }, (err, bankAccount) => {
          if (err) return reject(err)
          resolve(bankAccount)
        })
    })
  }
}
