import pmx from 'pmx'
import express from 'express'
// import mongoose from 'mongoose'
import config from './config/environment'
import configExpress from './config/express'
import routes from './routes'
import { auth, Logger, Sequence } from 'pu-common'

auth.config = config.auth
Logger.setConfig(config.logger)
Sequence.setConfig(config.sequence)

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

pmx.init({
  http: true, // HTTP routes logging (default: true)
  ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
  errors: true, // Exceptions loggin (default: true)
  custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
  network: true, // Network monitoring at the application level
  ports: true // Shows which ports your app is listening on (default: false)
})

const app = express()
configExpress(app)
routes(app)

// Start server
var server = app.listen(config.port, config.ip, function () {
  // mongoose.connect(config.mongo.uri, config.mongo.options, error => {
  //   if (error) {
  //     return Logger.error(error)
  //   }
  //   Logger.info('Connected to database')
  // })
  Logger.info(`pu-payment listening on ${config.port}, in ${app.get('env')} mode`)
})

process.on('exit', (cb) => {
  // mongoose.connection.close()
  console.log('bye......')
})

process.on('unhandledRejection', (err) => {
  throw err
})
process.on('uncaughtException', (err) => {
  console.log(err)
  Logger.critical(err)
  if (process.env.NODE_ENV === 'test') {
    process.exit(1)
  }
})

export default server
