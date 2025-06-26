import axios from 'axios'
import dotenv from 'dotenv'
import GameSimple from '../models/game'

interface SteamGameSimple {
  appid: number
  name: string
}

let steamGameSimpleCache: SteamGameSimple[] = []
let lastCacheUpdate = 0
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour

const getGames = async (limit: number = 10): Promise<SteamGameSimple[]> => {
  if (
    Date.now() - lastCacheUpdate > CACHE_DURATION &&
    steamGameSimpleCache.length > 0
  ) {
    return steamGameSimpleCache
  }

  const response = await axios.get('https://steamspy.com/api.php?request=all')
  const data = response.data

  steamGameSimpleCache = Object.entries(data).map(
    ([key, value]: [string, any]) => ({
      appid: Number(key),
      name: value.name,
    })
  )

  console.log(steamGameSimpleCache)

  lastCacheUpdate = Date.now()

  return steamGameSimpleCache || []

  // const now = Date.now();
  // if (now - lastCacheUpdate > CACHE_DURATION) {
  //   steamGameSimpleCache = await fetchSteamGameSimple();
  //   lastCacheUpdate = now;
  // }
  // return steamGameSimpleCache.slice(0, limit);
}

export default { getGames }

// import axios from 'axios'
// import dotenv from 'dotenv'
// import GameSimple from '../models/game'

// dotenv.config()

// let accessToken: string = ''
// let tokenExpiration = Date.now()

// async function getAccessToken() {
//   const now = Date.now()

//   if (!accessToken || now >= tokenExpiration) {
//     console.log('🔐 Getting new Twitch access token...')
//     const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
//       params: {
//         client_id: process.env.TWITCH_CLIENT_ID,
//         client_secret: process.env.TWITCH_CLIENT_SECRET,
//         grant_type: 'client_credentials',
//       },
//     })

//     accessToken = res.data.access_token
//     tokenExpiration = now + (res.data.expires_in - 60) * 1000
//   }

//   return accessToken
// }

// const getGames = async (limit: number = 10): Promise<GameSimple[]> => {
//   const token = await getAccessToken()

//   const response = await axios.post(
//     process.env.IGDB_API_URL || 'https://api.igdb.com/v4/games',
//     `fields name, summary, cover.url, first_release_date, genres.name, rating; limit ${limit};`,
//     {
//       headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   return response.data
// }

// const getGameById = async (id: number): Promise<GameSimple | null> => {
//   const token = await getAccessToken()

//   const response = await axios.post(
//     process.env.IGDB_API_URL || 'https://api.igdb.com/v4/games',
//     `fields name, summary, cover.url, first_release_date, genres.name, rating; where id = ${id};`,
//     {
//       headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   return response.data.length > 0 ? response.data[0] : null
// }

// const searchGamesByName = async (
//   name: string,
//   limit: number = 10
// ): Promise<GameSimple[]> => {
//   const token = await getAccessToken()

//   const response = await axios.post(
//     process.env.IGDB_API_URL || 'https://api.igdb.com/v4/games',
//     `
//     search "${name}";
//     fields name, summary, cover.url, first_release_date, genres.name, rating;
//     limit ${limit};
//     `,
//     {
//       headers: {
//         'Client-ID': process.env.TWITCH_CLIENT_ID,
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   )

//   return response.data
// }

// export default { getGames, getGameById, searchGamesByName }
