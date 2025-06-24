import authService from '../services/auth'
import userService from '../services/user'
import { Request, Response } from 'express'

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' })
      return
    }

    const token = await authService.login(email, password)

    res.cookie('idToken', token, { httpOnly: true })

    res
      .status(200)
      .json({ message: 'Login successful', data: token, user: { email } })
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Name, email and password are required' })
      return
    }

    const user = await userService.createUser({ name, email, password })
    res.status(201).json(user)
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('idToken')
    res.status(200).json({ message: 'Logout successful' })
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message })
  }
}

export default { login, register, logout }
