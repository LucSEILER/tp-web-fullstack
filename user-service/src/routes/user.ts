import express from 'express'
import userController from '../controllers/user'

const userRoutes = express.Router()

userRoutes.get('/', userController.getUsers)

export { userRoutes }
