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
    let { customerId, token } = req.body
    if (!customerId) {
      return HR.error(res, 'customerId is required', 422)
    }
    if (!token) {
      return HR.error(res, 'token is required', 422)
    }
    customerService.associateCard({ customerId, token })
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static associateBank (req, res) {
    let { customerId, publicToken, accountId } = req.body
    if (!customerId) {
      return HR.error(res, 'customerId is required', 422)
    }
    if (!publicToken) {
      return HR.error(res, 'publicToken is required', 422)
    }
    if (!accountId) {
      return HR.error(res, 'accountId is required', 422)
    }
    customerService.associateBank({ customerId, publicToken, accountId })
      .then(data => {
        return HR.send(res, data)
      }).catch(reason => {
        return HR.error(res, reason)
      })
  }

  static listCards (req, res) {
    const customerId = req.params.customerId
    if (!customerId) {
      return HR.error(res, 'customerId is required', 422)
    }
    customerService.listCards(customerId)
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
    const customerId = req.params.customerId
    if (!customerId) {
      return HR.error(res, 'customerId is required', 422)
    }
    customerService.listBanks(customerId)
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
