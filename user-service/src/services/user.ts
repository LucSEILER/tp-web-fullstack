import { User, UserCreate } from '../models/user'
import db from '../config/db'
import { hashPassword } from '../utils/bcrypt'

const getUsers = async (): Promise<User[]> => {
  const result = await db.query('SELECT id, name, email, password FROM users')

  return result.rows
}

const getUserById = async (id: string): Promise<User | null> => {
  const user = await db.query(
    'SELECT id, name, email, password FROM users WHERE id = $1',
    [id]
  )

  return user.rows[0] || null
}

const getUserByEmail = async (email: string): Promise<User | null> => {
  const result = await db.query(
    'SELECT id, name, email, password FROM users WHERE email = $1',
    [email]
  )

  return result.rows[0] || null
}

export const createUser = async (user: UserCreate): Promise<User | null> => {
  const userExists = await checkIfUserExists(user.email, user.name)
  if (userExists) return null

  const hashedPassword = await hashPassword(user.password)
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [user.name, user.email, hashedPassword]
  )

  return result.rows[0]
}

const checkIfUserExists = async (
  email: string,
  username: string
): Promise<boolean> => {
  const result = await db.query(
    'SELECT email, name FROM users WHERE email = $1 OR name = $2',
    [email, username]
  )

  return (result.rows.length ?? 0) > 0
}

const deleteUserById = async (id: string): Promise<boolean> => {
  const result = await db.query('DELETE FROM users WHERE id = $1', [id])

  return (result.rowCount ?? 0) > 0
}

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  deleteUserById,
}
