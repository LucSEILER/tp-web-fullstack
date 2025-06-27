import express from 'express'
import videogameController from '../controllers/videogame'
import authMiddleware from '../middleware/authToken'

const videogameRoutes = express.Router()

videogameRoutes.get('/', videogameController.getGames)
videogameRoutes.get('/details/:appid', videogameController.getSteamgameDetailsById)
videogameRoutes.get('/wichlist/my', authMiddleware, videogameController.getUserWishlist)
videogameRoutes.get('/wichlist', authMiddleware, videogameController.getUserGamelists)
videogameRoutes.post('/wichlist', authMiddleware, videogameController.addGameToList)
// videogameRoutes.get('/search', videogameController.searchGamesByName)
// videogameRoutes.get('/:id', videogameController.getGameById)

export { videogameRoutes }
