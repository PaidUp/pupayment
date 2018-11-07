import { MongoClient } from 'mongodb'
import { Logger } from 'pu-common'
// import config from '@/config/environment'
// let client
let db
let prefix

export default class Mongo {
  static connect (conf) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(conf.url,
        {useNewUrlParser: true},
        (err, cli) => {
          if (err) return reject(err)
          Mongo.client = cli
          prefix = conf.prefix
          if (err) return reject(err)
          resolve(cli)
          Logger.info('connected to db: ')
        })
    })
  }
  static getCollection (name) {
    return Mongo.client.db(db).collection(prefix + name)
  }
  static get collections () {
    return {
      transfers: this.getCollection('transfers'),
      payouts: this.getCollection('payouts')
    }
  }
}
