import express from 'express'
import { CustomerController } from '@/controllers'
import { auth } from 'pu-common'

const router = express.Router()
router.post('/', auth.validate, CustomerController.createCustomer)
router.post('/card', auth.validate, CustomerController.associateCard)
router.post('/bank', auth.validate, CustomerController.associateBank)
router.get('/:customerId/cards', auth.validate, CustomerController.listCards)
router.get('/:customerId/banks', auth.validate, CustomerController.listBanks)
router.delete('/card', auth.validate, CustomerController.deleteCard)
router.delete('/bank', auth.validate, CustomerController.deleteBank)

export default router
