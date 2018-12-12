import Service from './service'

class DepositService extends Service {
  fetchPayouts ({stripeAccount, limit, startingAfter, endingBefore}) {
    return this.stripe.fetchPayouts({stripeAccount, limit, startingAfter, endingBefore})
  }

  async fetchBalanceHistory (stripeAccount, payout) {
    let result = []
    let hasMore = true
    while (hasMore) {
      const startingAfter = result.length ? result[result.length - 1].id : null
      const resp = await this.stripe.fetchBalanceHistory(stripeAccount, payout, startingAfter)
      result = result.concat(resp.data)
      hasMore = resp.has_more
    }
    return result
  }
}

export default new DepositService()
