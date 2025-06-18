import { loadData } from '../models/user'

const getUsers = () => {
  const users = loadData('users')

  if (!users) return []

  return users
}

export default { getUsers }
