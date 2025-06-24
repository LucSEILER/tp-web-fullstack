import { User, UserCreate } from '../models/user'
import db from '../config/db'
import { hashPassword } from '../utils/bcrypt'

const getUsers = async (): Promise<User[]> => {
  try {
    const result = await db.query('SELECT id, name, email, password FROM users')
    console.log(result.rows)
    return result.rows
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await db.query('SELECT id, name, email, password FROM users WHERE id = $1', [id])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db.query('SELECT id, name, email, password FROM users WHERE email = $1', [email])
    return result.rows[0]
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export const createUser = async (user: UserCreate): Promise<User> => {
  try {
    await checkIfUserExists(user.email, user.name)

    const hashedPassword = await hashPassword(user.password)

    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [user.name, user.email, hashedPassword]
    )

    return result.rows[0]
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

const checkIfUserExists = async (
  email: string,
  username: string
): Promise<void> => {
  const result = await db.query(
    'SELECT email, name FROM users WHERE email = $1 OR name = $2',
    [email, username]
  )

  if (result.rows.length > 0) {
    const existingUser = result.rows[0]
    if (existingUser.email === email) {
      throw new Error('Email is already in use')
    }
    if (existingUser.name === username) {
      throw new Error('Username is already taken')
    }
  }
}

const deleteUserById = async (id: string): Promise<void> => {
  try {
    await db.query('DELETE FROM users WHERE id = $1', [id])
  } catch (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}

export default { getUsers, getUserById, getUserByEmail, createUser, deleteUserById }
