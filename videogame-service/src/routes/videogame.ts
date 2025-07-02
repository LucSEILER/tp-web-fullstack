import express from 'express'
import videogameController from '../controllers/videogame'

const videogameRoutes = express.Router()

videogameRoutes.get('/', videogameController.getGames)
videogameRoutes.get(
  '/details/:appid',
  videogameController.getSteamgameDetailsById
)
videogameRoutes.get('/search', videogameController.searchGamesByName)

export { videogameRoutes }
