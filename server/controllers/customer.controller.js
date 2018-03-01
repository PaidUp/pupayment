import { customerService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class AccountCotroller {
  static createCustomer (req, res) {
    customerService.createCustomer(req.body)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static associateCard (req, res) {
    customerService.associateCard(req.body)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static listCards (req, res) {
    customerService.listCards(req.params.customerId)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static deleteCard (req, res) {
    customerService.deleteCard(req.body)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static listBanks (req, res) {
    customerService.listBanks(req.params.customerId)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static deleteBank (req, res) {
    customerService.deleteBank(req.body)
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }
}
