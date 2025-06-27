import { Request, Response } from 'express'
import videogameService from '../services/videogame'

const getGames = async (req: Request, res: Response) => {
  const { limit, page } = req.query
  const pageInt = page && typeof page === 'string' ? parseInt(page, 10) : 1
  const limitInt = limit && typeof limit === 'string' ? parseInt(limit, 10) : 10

  const response = await videogameService.getGames(pageInt, limitInt)

  if (!response || response.results.length === 0) {
    res.status(404).json({ message: 'No games found', data: [] })
  }

  res
    .status(200)
    .json({ message: 'Games fetched successfully', data: response })
}

const getUserGamelists = async (req: Request, res: Response) => {
  const userGamelists = await videogameService.getUserGamelists()
  res
    .status(200)
    .json({ message: 'Gamelists fetched successfully', data: userGamelists })
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

  const result = await videogameService.addGameToList(gameId, userUuid, name)
  if (result.alreadyInTheList) {
    res.status(409).json({ message: 'Game already in the list' })
    return
  }

  res
    .status(200)
    .json({ message: 'Game successfully added to the list', data: result })
}

const getSteamgameDetailsById = async (req: Request, res: Response) => {
  const { appid } = req.params
  if (!appid) {
    res.status(400).json({ message: 'Appid is required' })
    return
  }

  const response = await videogameService.getSteamgameDetailsById(Number(appid))
  if (!response || response?.success === false) {
    res.status(404).json({ message: 'Game not found' })
    return
  }

  res.status(200).json({ message: 'Game fetched successfully', data: response })
}

const getUserWishlist = async (req: Request, res: Response) => {
  const userUuid = (req as any).user?.id
  if (!userUuid) {
    res
      .status(401)
      .json({ message: 'Unauthorized', error: 'User UUID not found' })
    return
  }

  console.log('User UUID', userUuid)

  const userWishlist = await videogameService.getUserWishlist(userUuid)
  if (!userWishlist) {
    res.status(404).json({ message: 'Wishlist not found' })
    return
  }

  res
    .status(200)
    .json({ message: 'Wishlist fetched successfully', data: userWishlist })
}

export default {
  getGames,
  getUserGamelists,
  addGameToList,
  getSteamgameDetailsById,
  getUserWishlist,
}

// const searchGamesByName = async (req: Request, res: Response) => {
//   try {
//     const { name } = req.query
//     const games = await videogameService.searchGamesByName(name as string)
//     res.status(200).json(games)
//   } catch (error) {
//     console.error('Error searching games:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }
