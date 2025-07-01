import dotenv from 'dotenv'
import express, { Express } from 'express'
import { setupLogging } from './logging'
import { videogameRoutes } from './routes/videogame'
import { reviewsRoutes } from './routes/reviews'
import { wishlistRoutes } from './routes/wishlist'
import cookiesParser from 'cookie-parser'
import YAML from 'yamljs'
import swaggerUI from 'swagger-ui-express'

dotenv.config()

const app: Express = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 7000

const swaggerDocument = YAML.load('./src/docs/swagger.yml')

setupLogging(app)

app.use(cookiesParser())
app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.get('/', (req: any, res: any) => {
  res.send({ message: 'Welcome to videogame-service' })
})

app.use('/games', videogameRoutes)
app.use('/reviews', reviewsRoutes)
app.use('/wishlist', wishlistRoutes)

app.listen(port, '0.0.0.0', () => {
  console.log(`API Gateway is running at http://localhost:${port}`)
})
