import Stripe from './common/stripe'
import Plaid from './common/plaid'
import config from '@/config/environment'
const stripe = new Stripe(config.stripe.key)
const plaid = new Plaid(config.plaid)

export default class Service {
  get stripe () {
    return stripe
  }

  get plaid () {
    return plaid
  }
}
