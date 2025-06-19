import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

let accessToken: string = ''
let tokenExpiration = Date.now()

async function getAccessToken() {
  const now = Date.now()

  if (!accessToken || now >= tokenExpiration) {
    console.log('🔐 Getting new Twitch access token...')
    const res = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: 'iicgs6aeuprldy6yujk3erd51fkux7',
        client_secret: 'z2t3hpw6nczn44z013yvq1hydipvne',
        grant_type: 'client_credentials',
      },
    })

    console.log(res.data)

    accessToken = res.data.access_token
    tokenExpiration = now + (res.data.expires_in - 60) * 1000
  }

  return accessToken
}

async function fetchGames(limit = 10) {
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

  return response.data.map((game: any) => ({
    name: game.name,
    description: game.summary,
    image: game.cover?.url
      ? game.cover.url.replace('t_thumb', 't_cover_big')
      : null,
    rating: game.rating,
    release_date: game.first_release_date
      ? new Date(game.first_release_date * 1000).toLocaleDateString()
      : null,
    genres: game.genres?.map((g: any) => g.name) || [],
  }))
}

export default { fetchGames }
