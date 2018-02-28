import Stripe from './common/stripe'
import config from '@/config/environment'
let stripe

class AccountService {
  constructor () {
    stripe = new Stripe(config.stripe.key)
  }

  createConnectAccount (payload) {
    return stripe.createConnectAccount(payload)
  }
}

let accountService = new AccountService()

export default accountService
