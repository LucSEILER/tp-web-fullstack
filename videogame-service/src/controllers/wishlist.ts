import { Request, Response } from 'express'
import wishlistService from '../services/wishlist'

const getUserWishlist = async (req: Request, res: Response) => {
  const userUuid = (req as any).user?.id
  if (!userUuid) {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'User UUID not found' })
    return
  }

  console.log('User UUID', userUuid)

  const userWishlist = await wishlistService.getUserWishlist(userUuid)
  if (!userWishlist) {
    res.status(404).json({ message: 'Wishlist not found' })
    return
  }

  res
    .status(200)
    .json({ message: 'Wishlist fetched successfully', data: userWishlist })
}

const addGameToList = async (req: Request, res: Response) => {
  const { gameId, name } = req.body
  const userUuid = (req as any).user?.id

  console.log('User UUID', userUuid)

  if (!userUuid) {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'User UUID not found' })
    return
  }

  const result = await wishlistService.addGameToList(gameId, userUuid, name)
  if (result.alreadyInTheList) {
    res.status(409).json({ message: 'Game already in the list' })
    return
  }

  res
    .status(200)
    .json({ message: 'Game successfully added to your list', data: result })
}

export default { getUserWishlist, addGameToList }
