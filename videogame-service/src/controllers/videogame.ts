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

export default { getGames }

// import { Request, Response } from 'express'
// import videogameService from '../services/videogame'

// const getGames = async (req: Request, res: Response) => {
//   try {
//     const { limit } = req.query
//     const games = await videogameService.getGames(
//       limit && typeof limit === 'string' ? parseInt(limit, 10) : 10
//     )
//     res.status(200).json(games)
//   } catch (error) {
//     console.error('Error fetching games:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

// const getGameById = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params
//     const game = await videogameService.getGameById(parseInt(id, 10))
//     if (game) {
//       res.status(200).json(game)
//     } else {
//       res.status(404).json({ message: 'Game not found' })
//     }
//   } catch (error) {
//     console.error('Error fetching game:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// }

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

// export default { getGames, getGameById, searchGamesByName }
