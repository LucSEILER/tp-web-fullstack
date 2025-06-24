import express from 'express'
import userController from '../controllers/user'

const userRoutes = express.Router()

userRoutes.get('/', userController.getUsers)
userRoutes.get('/:id', userController.getUserById)
userRoutes.post('/', userController.createUser)
userRoutes.delete('/:id', userController.deleteUserById)

export { userRoutes }
