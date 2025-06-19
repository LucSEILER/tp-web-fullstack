import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ||9000

setupLogging(app)

app.use(express.json())

app.get('/', (req: any, res: any) => {
  res.send({ message: 'Welcome to videogame-service' })
})

app.listen(port, () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
