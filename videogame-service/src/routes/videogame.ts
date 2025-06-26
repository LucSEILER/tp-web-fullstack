import express from 'express'
import videogameController from '../controllers/videogame'

const videogameRoutes = express.Router()

videogameRoutes.get('/', videogameController.getGames)
videogameRoutes.get('/userlists', videogameController.getUserGamelists)
videogameRoutes.post('/userlists', videogameController.addGameToList)
// videogameRoutes.get('/search', videogameController.searchGamesByName)
// videogameRoutes.get('/:id', videogameController.getGameById)

export { videogameRoutes }
