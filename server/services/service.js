import Stripe from './common/stripe'
import config from '@/config/environment'

let stripe = new Stripe(config.stripe.key)

export default class Service {
  constructor () {
    this.stripe = stripe
  }
}
