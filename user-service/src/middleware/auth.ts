import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeaders = req.headers.authorization
  if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing bearer token' })
  }

  const tokenFromHeader = authHeaders.split(' ')[1]
  const tokenFromCookie = req.cookies.idToken
  const token = tokenFromHeader || tokenFromCookie

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  console.log('Token:', token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.user = decoded
    console.log('Decoded token:', decoded)
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

export default authMiddleware
