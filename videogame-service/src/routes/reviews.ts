import express from 'express'
import reviewController from '../controllers/review'
import authMiddleware from '../middleware/authToken'

const reviewsRoutes = express.Router()

reviewsRoutes.get('/:gameId', reviewController.getReviewsByGameId)
reviewsRoutes.post('/', authMiddleware, reviewController.addReview)

export { reviewsRoutes }
