import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

// const authMiddleware = (req: any, res: any, next: any) => {
//   const authHeaders = req.headers.authorization
//   if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Missing bearer token' })
//   }

//   const tokenFromHeader = authHeaders.split(' ')[1]
//   const tokenFromCookie = req.cookies.idToken
//   const token = tokenFromHeader || tokenFromCookie

//   if (!token) {
//     return res.status(401).json({ message: 'Missing token' })
//   }

//   console.log('Token:', token)

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
//     req.user = decoded
//     console.log('Decoded token:', decoded)
//     next()
//   } catch (error: any) {
//     return res.status(401).json({ message: 'Unauthorized', error: error.message })
//   }
// }

interface TokenResponse {
  token: string
  user: {
    id: number
    name: string
    email: string
  }
}

const authMiddleware = (req: any, res: any, next: any) => {
  const authHeaders = req.headers.authorization
  const tokenFromHeader =
    authHeaders && authHeaders.startsWith('Bearer ')
      ? authHeaders.split(' ')[1]
      : null

  if (tokenFromHeader) {
    console.log('Token from header:', tokenFromHeader)
  } else {
    console.log('No token found in headers')
  }

  const tokenFromCookie = req.cookies?.idToken

  if (tokenFromCookie) {
    console.log('Token from cookie:', tokenFromCookie)
  } else {
    console.log('No token found in cookies')
  }

  const token: TokenResponse['token'] = tokenFromHeader || tokenFromCookie?.token

  console.log('TOKEN BEFORE:', token)

  if (!token) {
    return res.status(401).json({ message: 'Missing token' })
  }

  console.log('Token:', token)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '')
    req.user = decoded
    console.log('Decoded token:', decoded)
    next()
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: 'Unauthorized', error: error.message })
  }
}

export default authMiddleware
