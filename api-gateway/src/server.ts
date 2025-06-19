import dotenv from 'dotenv'
import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { setupProxies } from './proxy'
import { ROUTES } from './routes'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

app.use(cors())

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('/ of API Gateway')
})

setupProxies(app, ROUTES)

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
