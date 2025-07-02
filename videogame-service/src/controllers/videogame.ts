import { Request, Response } from 'express'
import videogameService from '../services/videogame'

const getGames = async (req: Request, res: Response) => {
  const { limit, page } = req.query
  const pageInt = page && typeof page === 'string' ? parseInt(page, 10) : 1
  const limitInt = limit && typeof limit === 'string' ? parseInt(limit, 10) : 10

  const response = await videogameService.getGames(pageInt, limitInt)
  if (!response || response.results.length === 0) {
    res.status(404).json({ message: 'No games found', data: [] })
    return
  }

  res
    .status(200)
    .json({ message: 'Games fetched successfully', data: response })
}

const getSteamgameDetailsById = async (req: Request, res: Response) => {
  const { appid } = req.params
  if (!appid) {
    res.status(400).json({ message: 'Appid is required' })
    return
  }

  console.log('Looking for game with appid', appid)

  const response = await videogameService.getSteamgameDetailsById(Number(appid))
  if (!response || response?.success === false) {
    res.status(404).json({ message: 'Game not found' })
    return
  }

  res.status(200).json({ message: 'Game fetched successfully', data: response })
}

const searchGamesByName = async (req: Request, res: Response) => {
  const { name } = req.query

  if (!name) {
    res.status(400).json({ message: 'Name is required' })
    return
  }

  const games = await videogameService.searchGamesByName(name as string)
  res.status(200).json({ message: 'Games fetched successfully', data: games })
}

export default {
  getGames,
  getSteamgameDetailsById,
  searchGamesByName,
}
