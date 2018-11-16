/**
 * Express configuration
 */

import compression from 'compression'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import errorhandler from 'errorhandler'
import pmx from 'pmx'

export default function (app) {
  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.raw({
    type: (req) => {
      let contentType = req.headers['content-type']
      return contentType && contentType.includes('application/json')
    }
  }))
  app.use((req, res, next) => {
    let contentType = req.headers['content-type']
    if (contentType && contentType.includes('application/json')) {
      req.rawBody = req.body
      req.body = JSON.parse(req.rawBody.toString())
    }
    next()
  })
  // app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(pmx.expressErrorHandler())
  if (process.env.NODE_ENV === 'local') {
    app.use(errorhandler())
    app.use(morgan('dev'))
  }
}
