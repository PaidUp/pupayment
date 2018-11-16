import Service from './service'

class DepositService extends Service {
  fetchPayouts (stripeAccount, limit, startingAfter) {
    return this.stripe.fetchPayouts(stripeAccount, limit, startingAfter)
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
    console.log('result: ', result)
    return result
  }
}

export default new DepositService()
