import axios from 'axios'
import dotenv from 'dotenv'
import GameSimple from '../models/game'

dotenv.config()

let accessToken: string = ''
let tokenExpiration = Date.now()

async function getAccessToken() {
  const now = Date.now()

  if (!accessToken || now >= tokenExpiration) {
    console.log('🔐 Getting new Twitch access token...')
    const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials',
      },
    })

    accessToken = res.data.access_token
    tokenExpiration = now + (res.data.expires_in - 60) * 1000
  }

  return accessToken
}

const getGames = async (limit: number = 10): Promise<GameSimple[]> => {
  const token = await getAccessToken()

  const response = await axios.post(
    'https://api.igdb.com/v4/games',
    `fields name, summary, cover.url, first_release_date, genres.name, rating; limit ${limit};`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data
}

export default { getGames }
