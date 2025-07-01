import { Request, Response } from 'express'
import reviewService from '../services/review'

const addReview = async (req: Request, res: Response) => {
  const { gameId, name, rating, review } = req.body
  if (!gameId || !name || !rating || !review) {
    res.status(400).json({ message: 'Some fields are missing' })
    return
  }

  console.log('review to add', req.body)

  const userUuid = (req as any).user?.id
  if (!userUuid) {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'User UUID not found' })
    return
  }

  const username = (req as any).user?.name
  if (!username || username === '') {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'Username not found' })
    return
  }

  console.log('User UUID', userUuid, 'Username', username)

  const result = await reviewService.addReview(
    userUuid,
    username,
    gameId,
    name,
    rating,
    review
  )
  if (result.alreadyReviewed) {
    res.status(409).json({ message: 'You already reviewed this game' })
    return
  }

  res.status(200).json({ message: 'Review added successfully', data: result })
}

const getReviewsByGameId = async (req: Request, res: Response) => {
  const { gameId } = req.params

  if (!gameId) {
    res.status(400).json({ message: 'GameId is required' })
    return
  }

  const reviews = await reviewService.getReviewsByGameId(Number(gameId))
  res
    .status(200)
    .json({ message: 'Reviews fetched successfully', data: reviews })
}

export default { addReview, getReviewsByGameId }
