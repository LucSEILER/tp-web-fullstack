import { loadData } from '../models/user'

const getUsers = () => {
  const users = loadData('users')

  if (!users) return []

  return users
}

const findUserByEmail = (email: string) => {
  const users = getUsers()

  if (!users) return null

  return users.find((user: any) => user.email === email)
}

export default { getUsers, findUserByEmail }
