import Stripe from './common/stripe'
import Plaid from './common/plaid'
import config from '@/config/environment'

let plaid = new Plaid(config.plaid)
export default class Service {
  constructor () {
    this.stripe = new Stripe(config.stripe.key)
    this.plaid = plaid
  }
}
