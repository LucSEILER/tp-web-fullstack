import { loadData } from '../models/user'
import db from '../config/db'

interface User {
  id: number
  name: string
  email: string
  password: string
}

const getUsers = async () => {
  // const users = loadData('users')

  // if (!users) return []

  // return users
  try {
    const result = await db.query('SELECT id, name, email, password FROM users')
    console.log(result.rows)
    return result.rows
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// const findUserByEmail = (email: string) => {
//   const users = getUsers()

//   if (!users) return null

//   return users.find((user: any) => user.email === email)
// }

export default { getUsers }
