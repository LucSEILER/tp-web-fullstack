import express from 'express'
import authController from '../controllers/auth'

const authRoutes = express.Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)
authRoutes.post('/logout', authController.logout)

export { authRoutes }
