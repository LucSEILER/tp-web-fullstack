import { Request, Response } from 'express'
import userService from '../services/user'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const user = await userService.getUserById(userId)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email and password are required' })
      return
    }

    const user = await userService.createUser({ name, email, password })
    res.status(201).json(user)
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
}

const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    const user = await userService.getUserById(userId)
    if (user) {
      await userService.deleteUserById(userId)
      res.status(200).json({ message: 'User deleted successfully' })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default { getUsers, getUserById, createUser, deleteUserById }
