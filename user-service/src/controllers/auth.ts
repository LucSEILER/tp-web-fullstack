// import authService from '../services/auth'
// import { Request, Response } from 'express'

// const login = (req: Request, res: Response) => {
//   const { email } = req.body
//   if (!email) {
//     res.status(400).json({ message: 'Email is required' })
//     return
//   }

//   try {
//     const token = authService.login(email)
//     res.status(200).json({ message: 'Login successful', data: token })
//   } catch (error: any) {
//     res
//       .status(500)
//       .json({ message: 'Internal server error', error: error.message })
//   }
// }

// export default { login }
