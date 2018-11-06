import Service from './service'
import Mongo from '@/util/mongo'

class WebhookService extends Service {
  saveTransfer (secret, signature, body) {
    return new Promise((resolve, reject) => {
      const event = this.stripe.getEvent(secret, signature, body)
      console.log('event: ', event)
      if (event && !event.data.object.destination_payment.startsWith('py_')) resolve(true)
      const collection = Mongo.getCollection('transfers')
      this.stripe.fetchTransfer(event.data.object.id).then(transfer => {
        collection.findOneAndReplace({ id: transfer.id }, transfer,
          { upsert: true }, (errdb, data) => {
            if (errdb) {
              return reject(errdb)
            }
            resolve(null, data)
          })
      }).catch(reason => reject(reason))
    })
  }

  savePayout (secret, signature, body) {
    return new Promise((resolve, reject) => {
      const event = this.stripe.getEvent(secret, signature, body)
      console.log('event: ', event)
      const collection = Mongo.getCollection('payouts')
      this.stripe.fetchTransfer(event.data.object.id).then(payout => {
        collection.findOneAndReplace({ id: payout.id }, payout,
          { upsert: true }, (errdb, data) => {
            if (errdb) {
              return reject(errdb)
            }
            resolve(null, data)
          })
      }).catch(reason => reject(reason))
    })
  }
}

export default new WebhookService()
