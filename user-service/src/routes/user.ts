import express from 'express'
import userController from '../controllers/user'
import authMiddleware from '../middleware/auth'

const userRoutes = express.Router()

userRoutes.get('/', authMiddleware, userController.getUsers)
userRoutes.get('/me', authMiddleware, userController.getMe)
userRoutes.get('/:id', authMiddleware, userController.getUserById)
userRoutes.post('/', userController.createUser)
userRoutes.delete('/:id', authMiddleware, userController.deleteUserById)

export { userRoutes }
