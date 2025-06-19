import express from 'express'
import authController from '../controllers/auth'

const authRoutes = express.Router()

authRoutes.post('/login', authController.login)

export { authRoutes }
