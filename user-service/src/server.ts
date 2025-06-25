import dotenv from 'dotenv'
import express, { Express, Request, Response, NextFunction } from 'express'
import { setupLogging } from './logging'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

setupLogging(app)

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(cookieParser())
app.use(express.json())

const swaggerDocument = YAML.load('./src/docs/swagger.yml')

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.use('/', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
