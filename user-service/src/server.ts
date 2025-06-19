import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 5000

setupLogging(app)

app.use(express.json())

app.get('/', (req: any, res: any) => {
  res.send({ message: 'Welcome to user-service' })
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
