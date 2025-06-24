import jwt from 'jsonwebtoken'
import userService from './user'
import { comparePassword } from '../utils/bcrypt'

const login = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email)
  if (user) {
    const isPasswordValid = await comparePassword(password, user.password)
    if (isPasswordValid) {
      const token = jwt.sign({ name: user.name, id: user.id, email: user.email }, 'secret', {
        expiresIn: '1h',
      })
      return token
    } else {
      throw new Error('Invalid password')
    }
  } else {
    throw new Error('User not found')
  }
}

export default { login }
