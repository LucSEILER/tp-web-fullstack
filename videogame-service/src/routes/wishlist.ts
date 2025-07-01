import express from 'express'
import wishlistController from '../controllers/wishlist'
import authMiddleware from '../middleware/authToken'

const wishlistRoutes = express.Router()

wishlistRoutes.get('/', authMiddleware, wishlistController.getUserGamelists)
wishlistRoutes.get('/my', authMiddleware, wishlistController.getUserWishlist)
wishlistRoutes.post('/', authMiddleware, wishlistController.addGameToList)

export { wishlistRoutes }
