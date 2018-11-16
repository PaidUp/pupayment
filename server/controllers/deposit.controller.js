import { depositService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class DepositCotroller {
  static fetchPayouts (req, res) {
    const stripeAccount = req.params.account
    const { limit = 10, startingAfter, endingBefore } = req.query
    if (!stripeAccount) return HR.error(res, 'account is required', 422)
    depositService.fetchPayouts({stripeAccount, limit, startingAfter, endingBefore})
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason.message)
      })
  }

  static fetchBalanceHistory (req, res) {
    const { account, payout } = req.params
    if (!account) return HR.error(res, 'account is required', 422)
    if (!payout) return HR.error(res, 'payout is required', 422)
    Promise.all([
      depositService.fetchBalanceHistory(account, payout, 'payment'),
      depositService.fetchBalanceHistory(account, payout, 'adjustment')
    ]).then(values => {
      return HR.send(res, values[0].concat(values[1]))
    }).catch(reason => {
      return HR.error(res, reason.message)
    })
  }
}
