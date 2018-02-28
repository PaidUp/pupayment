import express from 'express'
import { AccountController } from '@/controllers'
import { auth } from 'pu-common'

const router = express.Router()
router.post('/', auth.validate, AccountController.createConnectAccount)

export default router
