import express from 'express'
import videogameController from '../controllers/videogame'

const videogameRoutes = express.Router()

videogameRoutes.get('/', videogameController.getGames)

export { videogameRoutes }
