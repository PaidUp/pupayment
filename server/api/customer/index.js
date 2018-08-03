import express from 'express'
import { CustomerController } from '@/controllers'
import { auth } from 'pu-common'

const router = express.Router()
router.post('/', auth.validate, CustomerController.createCustomer)
router.post('/card', auth.validate, CustomerController.associateCard)
router.post('/bank', auth.validate, CustomerController.associateBank)
router.get('/:customerId/cards', auth.validate, CustomerController.listCards)
router.get('/:customerId/banks', auth.validate, CustomerController.listBanks)
router.put('/card', auth.validate, CustomerController.deleteCard)
router.put('/bank', auth.validate, CustomerController.deleteBank)
router.put('/refund', auth.validate, CustomerController.refund)

export default router
