import { webhookService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'
import config from '@/config/environment'

export default class AccountCotroller {
  static saveTransfer (req, res) {
    const signature = req.headers['stripe-signature']
    const secret = config.stripe.webhooks.transfers
    webhookService.saveTransfer(secret, signature, req.rawBody)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason.message)
      })
  }

  static savePayout (req, res) {
    const signature = req.headers['stripe-signature']
    const secret = config.stripe.webhooks.payouts
    webhookService.savePayout(secret, signature, req.rawBody)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason.message)
      })
  }
}
