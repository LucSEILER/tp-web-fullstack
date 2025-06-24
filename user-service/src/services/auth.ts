import jwt from 'jsonwebtoken'
import userService from './user'

// const login = (email: string) => {
//     const user = userService.findUserByEmail(email)
//     console.log(user)
//   if (user) {
//     const token = jwt.sign({ id: user.id, email: user.email }, 'secret', {
//       expiresIn: '1h',
//     })
//     return token
//   } else {
//     return null
//   }
// }

// export default { login }
