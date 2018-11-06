import express from 'express'
import account from './account'
import customer from './customer'
import webhook from './webhook'
const router = express.Router()

router.use('/account', account)
router.use('/customer', customer)
router.use('/webhook', webhook)

export default router
