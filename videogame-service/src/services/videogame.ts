import axios from 'axios'
import SteamGameSimple from '../models/steamGame'
import PaginatedApiResponse from '../models/paginatedApiResponse'
import db from '../config/db'

let steamGameSimpleCache: SteamGameSimple[] = []
let lastCacheUpdate = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

const getGames = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedApiResponse<SteamGameSimple>> => {
  const now = Date.now()

  console.log('Page', page, 'Limit', limit)

  if (
    now - lastCacheUpdate > CACHE_DURATION ||
    steamGameSimpleCache.length === 0
  ) {
    console.log('Updating cache...')
    const response = await axios.get('https://steamspy.com/api.php?request=all')
    const data = response.data

    steamGameSimpleCache = Object.entries(data).map(
      ([key, value]: [string, any]) => ({
        appid: Number(key),
        name: value.name,
      })
    )

    lastCacheUpdate = now
  }

  const count = steamGameSimpleCache.length
  const totalPages = Math.ceil(count / limit)
  const start = (page - 1) * limit
  // const results = steamGameSimpleCache.slice(start, start + limit)
  // const nextPage = page + 1

  const slicedGames = steamGameSimpleCache.slice(start, start + limit)
  const appIds = slicedGames.map((g) => g.appid)

  const results = await fetchSteamGameDetailsBatch(appIds)

  return {
    count,
    currentPage: page,
    totalPages: totalPages,
    next: page + 1,
    pageSize: limit,
    results: results,
  }
}

interface SteamGameDetail extends SteamGameSimple {
  image: string
  description: string
}

export const fetchSteamGameDetailsBatch = async (
  appIds: number[]
): Promise<SteamGameDetail[]> => {
  const results = await Promise.all(
    appIds.map(async (appid) => {
      try {
        const res = await axios.get(
          `https://store.steampowered.com/api/appdetails?appids=${appid}`
        )
        const game = res.data[appid]
        if (game.success) {
          return {
            appid,
            name: game.data.name,
            image: game.data.header_image,
            description: game.data.short_description,
          }
        }
      } catch (e) {
        return null
      }
    })
  )

  return results.filter((g) => g !== null) as SteamGameDetail[]
}

const getUserGamelists = async () => {
  const userGamelists = await await db.query(
    'SELECT id, user_id, game_id, name FROM videogame_userlist'
  )
  return userGamelists.rows || []
}

const getSteamgameDetailsById = async (appid: number) => {
  const response = await axios.get(
    `https://store.steampowered.com/api/appdetails?appids=${appid}`
  )
  const responseAppId = Object.keys(response.data)[0]
  const gameDetails = response.data[responseAppId]

  return gameDetails
}

const addGameToList = async (gameId: number, userId: number, name: string) => {
  const result = await db.query(
    'INSERT INTO videogame_userlist (game_id, user_id, name) VALUES ($1, $2, $3) RETURNING id, game_id, user_id, name',
    [gameId, userId, name]
  )
  return result.rows[0]
}

export default {
  getGames,
  getUserGamelists,
  addGameToList,
  getSteamgameDetailsById,
}
