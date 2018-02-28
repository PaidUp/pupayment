import { accountService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class AccountCotroller {
  static createConnectAccount (req, res) {
    accountService.createConnectAccount(req.body)
      .then(order => {
        return HR.send(res, order)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }
}
