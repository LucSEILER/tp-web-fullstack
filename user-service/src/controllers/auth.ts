import authService from '../services/auth'
import userService from '../services/user'
import { Request, Response } from 'express'

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }

  const token = await authService.login(email, password)
  if (!token) {
    res.status(401).json({ message: 'Invalid credentials' })
    return
  }

  res.cookie('idToken', token, { httpOnly: true })

  res.status(200).json({ message: 'Login successful', data: token })
}

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    res.status(400).json({ message: 'Name, email and password are required' })
    return
  }

  const createdUser = await userService.createUser({ name, email, password })

  if (!createdUser) {
    res.status(409).json({ message: 'This email or username is already in use' })
  }

  res.status(201).json(createdUser)
}

const logout = async (req: Request, res: Response) => {
  res.clearCookie('idToken')
  res.status(200).json({ message: 'Logout successful' })
}

export default { login, register, logout }
