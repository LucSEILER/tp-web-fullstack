import jwt from 'jsonwebtoken'
import userService from './user'
import { comparePassword } from '../utils/bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email)
  if (!user) return null

  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) return null

  const token = jwt.sign(
    { name: user.name, id: user.id, email: user.email },
    process.env.JWT_SECRET || '',
    {
      expiresIn: '1h',
    }
  )

  return { token, user: { id: user.id, name: user.name, email: user.email } }
}

export default { login }
