import express from 'express'
import { auth } from 'pu-common'
import { WebhookController } from '@/controllers'

const router = express.Router()
router.get('/payout/:account', auth.validate, WebhookController.fetchPayout)
router.get('/transfer/:account/:arrival/:source', auth.validate, WebhookController.fetchTransfer)
router.post('/transfer', WebhookController.saveTransfer)
router.post('/payout', WebhookController.savePayout)

export default router
