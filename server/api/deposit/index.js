import express from 'express'
import { auth } from 'pu-common'
import { DepositController } from '@/controllers'

const router = express.Router()
router.get('/payout/:account', auth.validate, DepositController.fetchPayouts)
router.get('/balance/:account/:payout', auth.validate, DepositController.fetchBalanceHistory)

export default router
