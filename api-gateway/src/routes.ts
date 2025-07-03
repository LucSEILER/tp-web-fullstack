import dotenv from 'dotenv'

dotenv.config()

interface Route {
  url: string
  auth: boolean
  creditCheck: boolean
  rateLimit?: {
    windowMs: number
    max: number
  }
  proxy: {
    target: string
    router?: { [key: string]: string }
    changeOrigin: boolean
    pathFilter?: string
    pathRewrite?: { [key: string]: string }
  }
}

const ROUTES: Route[] = [
  {
    url: '/users',
    auth: false,
    creditCheck: false,
    proxy: {
      target: `http://${process.env.USER_SERVICE_NAME}:5000`,
      changeOrigin: true,
    },
  },
  {
    url: '/videogame',
    auth: false,
    creditCheck: false,
    proxy: {
      target: `http://${process.env.VIDEOGAME_SERVICE_NAME}:7000`,
      changeOrigin: true,
    },
  },
]

export { ROUTES, Route }
