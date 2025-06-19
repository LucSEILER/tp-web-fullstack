import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'
import videogameService from './services/videogame'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 7000

setupLogging(app)

app.use(express.json())

app.get('/', (req: any, res: any) => {
  res.send({ message: 'Welcome to videogame-service' })
})

app.get('/games', (req: any, res: any) => {
  try {
    const games = videogameService.fetchGames()
    res.status(200).json(games)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
