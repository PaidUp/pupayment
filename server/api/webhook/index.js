import express from 'express'
import { WebhookController } from '@/controllers'

const router = express.Router()
router.post('/transfer', WebhookController.saveTransfer)
router.post('/payout', WebhookController.savePayout)

export default router
