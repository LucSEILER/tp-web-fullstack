import { Request, Response } from 'express'
import wishlistService from '../services/wishlist'

const getUserPlaylist = async (req: Request, res: Response) => {
  const userUuid = (req as any).user?.id
  if (!userUuid) {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'User UUID not found' })
    return
  }

  console.log('User UUID', userUuid)

  const userWishlist = await wishlistService.getUserPlaylist(userUuid)
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

const removeGameFromList = async (req: Request, res: Response) => {
  const { gameId } = req.params
  const userId = (req as any).user?.id

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: user not authenticated' })
  }

  const parsedGameId = Number(gameId)
  if (!parsedGameId || isNaN(parsedGameId)) {
    res.status(400).json({ message: 'Invalid game ID' })
  }

  console.log('User UUID', userId, 'Game ID', parsedGameId)

  const result = await wishlistService.removeGameFromList(parsedGameId, userId)
  if (result.error === 'not_found') {
    res.status(404).json({ message: 'Game not found in your list' })
  }
  if (result.error === 'delete_failed') {
    res.status(500).json({ message: 'Failed to remove game from list' })
  }

  res.status(200).json({ message: 'Game successfully removed from your list' })
}

export default { getUserPlaylist, addGameToList, removeGameFromList }
