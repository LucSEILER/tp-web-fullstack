import { Request, Response } from 'express'
import userService from '../services/user'

const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
}

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id
  const user = await userService.getUserById(userId)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    res.status(200).json(user)
  }
}

const getMe = async (req: Request, res: Response) => {
  const user = (req as any).user
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }

  res.status(200).json(user)
}

const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Name, email and password are required' })
    return
  }

  const user = await userService.createUser({ name, email, password })
  res.status(201).json(user)
}

const deleteUserById = async (req: Request, res: Response) => {
  const userId = req.params.id
  const success = await userService.deleteUserById(userId)
  if (!success) {
    res.status(404).json({ message: 'User not found' })
  } else {
    res.status(200).json({ message: 'User deleted successfully' })
  }
}

export default { getUsers, getMe, getUserById, createUser, deleteUserById }
