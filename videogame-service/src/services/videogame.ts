import axios from 'axios'
import SteamGameSimple from '../models/steamGame'
import PaginatedApiResponse from '../models/paginatedApiResponse'

let steamGameSimpleCache: SteamGameSimple[] = []
let lastCacheUpdate = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

export const getGames = async (
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
  const results = steamGameSimpleCache.slice(start, start + limit)
  const nextPage = page + 1

  return {
    count,
    currentPage: page,
    totalPages: totalPages,
    next: nextPage,
    pageSize: limit,
    results,
  }
}

export default { getGames }
