import Service from './service'

class AccountService extends Service {
  createConnectAccount (payload) {
    return this.stripe.createConnectAccount(payload)
  }
}

let accountService = new AccountService()

export default accountService
