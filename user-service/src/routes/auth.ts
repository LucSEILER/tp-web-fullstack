import express from 'express'
import authController from '../controllers/auth'
import authMiddleware from '../middleware/auth'

const authRoutes = express.Router()

authRoutes.post('/login', authController.login)
authRoutes.post('/register', authController.register)
authRoutes.post('/logout', authMiddleware, authController.logout)

export { authRoutes }
