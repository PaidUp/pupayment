import express from 'express'
import { auth } from 'pu-common'
import { WebhookController } from '@/controllers'

const router = express.Router()
router.get('/transfer/:account/:arrival', auth.validate, WebhookController.fetchTransfer)
router.get('/payout/:account', auth.validate, WebhookController.fetchPayout)
router.post('/transfer', WebhookController.saveTransfer)
router.post('/payout', WebhookController.savePayout)

export default router
