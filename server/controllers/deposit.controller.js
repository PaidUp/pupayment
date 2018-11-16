import { depositService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class DepositCotroller {
  static fetchPayouts (req, res) {
    const stripeAccount = req.params.account
    const { limit = 10, startingAfter } = req.query
    if (!stripeAccount) return HR.error(res, 'account is required', 422)
    depositService.fetchPayouts(stripeAccount, limit, startingAfter)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason.message)
      })
  }

  static async fetchBalanceHistory (req, res) {
    const { account, payout } = req.params
    if (!account) return HR.error(res, 'account is required', 422)
    if (!payout) return HR.error(res, 'payout is required', 422)
    depositService.fetchBalanceHistory(account, payout).then(data => {
      return HR.send(res, data)
    }).catch(reason => {
      return HR.error(res, reason.message)
    })
  }
}
