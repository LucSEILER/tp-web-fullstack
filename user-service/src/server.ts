import dotenv from 'dotenv'
import express, { Express, Request, Response, NextFunction } from 'express'
import { setupLogging } from './logging'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 7000

setupLogging(app)

app.use(express.json())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

// app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
//   console.error(err.stack)
//   res.status(500).send('Something broke!')
// })

app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
