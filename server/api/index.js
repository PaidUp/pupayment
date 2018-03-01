import express from 'express'
import account from './account'
import customer from './customer'
const router = express.Router()

router.use('/account', account)
router.use('/customer', customer)

export default router
