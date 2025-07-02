import express from 'express'
import wishlistController from '../controllers/wishlist'
import authMiddleware from '../middleware/authToken'

const wishlistRoutes = express.Router()

wishlistRoutes.get('/my', authMiddleware, wishlistController.getUserPlaylist)
wishlistRoutes.post('/', authMiddleware, wishlistController.addGameToList)
wishlistRoutes.delete(
  '/:gameId',
  authMiddleware,
  wishlistController.removeGameFromList
)

export { wishlistRoutes }
