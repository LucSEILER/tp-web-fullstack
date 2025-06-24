import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'
import { videogameRoutes } from './routes/videogame'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 7000

setupLogging(app)

app.use(express.json())

// app.get('/', (req: any, res: any) => {
//   res.send({ message: 'Welcome to videogame-service' })
// })

app.use('/', videogameRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
