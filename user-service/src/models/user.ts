interface User {
  id: number
  name: string
  email: string
  password: string
}

interface UserCreate {
  name: string
  email: string
  password: string
}

export { User, UserCreate }
