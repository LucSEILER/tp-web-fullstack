import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'
import cookieParser from 'cookie-parser'
import swaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 5000

setupLogging(app)

app.use(cookieParser())
app.use(express.json())

const swaggerDocument = YAML.load('./src/docs/swagger.yml')

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use('/', userRoutes)
app.use('/auth', authRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
