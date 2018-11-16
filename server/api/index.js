import express from 'express'
import account from './account'
import customer from './customer'
import deposit from './deposit'
const router = express.Router()

router.use('/account', account)
router.use('/customer', customer)
router.use('/deposit', deposit)

export default router
