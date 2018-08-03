import { customerService } from '@/services'
import { HandlerResponse as HR } from 'pu-common'

export default class AccountCotroller {
  static createCustomer (req, res) {
    customerService.createCustomer(req.body)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static associateCard (req, res) {
    let { customerId, token } = req.body
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    if (!token) return HR.error(res, 'token is required', 422)
    customerService.associateCard({ customerId, token })
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static associateBank (req, res) {
    let { customerId, publicToken, accountId } = req.body
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    if (!publicToken) return HR.error(res, 'publicToken is required', 422)
    if (!accountId) return HR.error(res, 'accountId is required', 422)
    customerService.associateBank({ customerId, publicToken, accountId })
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static listCards (req, res) {
    const customerId = req.params.customerId
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    customerService.listCards(customerId)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static deleteCard (req, res) {
    let { customerId, cardId } = req.body
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    if (!cardId) return HR.error(res, 'cardId is required', 422)

    customerService.deleteCard(customerId, cardId)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static listBanks (req, res) {
    const customerId = req.params.customerId
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    customerService.listBanks(customerId)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static deleteBank (req, res) {
    let { customerId, bankId } = req.body
    if (!customerId) return HR.error(res, 'customerId is required', 422)
    if (!bankId) return HR.error(res, 'bankId is required', 422)

    customerService.deleteBank(customerId, bankId)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }

  static refund (req, res) {
    let { chargeId, reason, amount } = req.body
    if (!chargeId) return HR.error(res, 'chargeId is required', 422)
    if (!reason) return HR.error(res, 'reason is required', 422)
    if (!amount) return HR.error(res, 'amount is required', 422)
    let price = Number(amount)
    customerService.refund(chargeId, reason, price)
      .then(data => HR.send(res, data))
      .catch(reason => HR.error(res, reason))
  }
}
