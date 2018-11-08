import Service from './service'
import Mongo from '@/util/mongo'

class WebhookService extends Service {
  saveTransfer (secret, signature, body) {
    return new Promise((resolve, reject) => {
      const event = this.stripe.getEvent(secret, signature, body)
      console.log('event: ', event)
      if (event && !event.data.object.destination_payment.startsWith('py_')) resolve(true)
      const collection = Mongo.collections.transfers
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

  fetchTransfer (account, arrival, source) {
    return new Promise((resolve, reject) => {
      const collection = Mongo.collections.transfers
      collection.find({
        'destination': account,
        'balance_transaction.available_on': parseInt(arrival),
        'source_type': source
      }).toArray((err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  savePayout (secret, signature, body) {
    return new Promise((resolve, reject) => {
      const event = this.stripe.getEvent(secret, signature, body)
      console.log('event: ', event)
      const collection = Mongo.collections.payouts
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

  fetchPayout (account) {
    return new Promise((resolve, reject) => {
      const collection = Mongo.collections.payouts
      collection.find({'destination.account': account}).toArray((err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }
}

export default new WebhookService()
