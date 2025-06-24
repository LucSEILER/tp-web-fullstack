import { Request, Response } from 'express'
import videogameService from '../services/videogame'

const getGames = async (req: Request, res: Response) => {
  try {
    const { limit } = req.query
    const games = await videogameService.getGames(
      limit && typeof limit === 'string' ? parseInt(limit, 10) : 10
    )
    res.status(200).json(games)
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export default { getGames }
