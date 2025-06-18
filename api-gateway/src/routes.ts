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
    url: '/auth',
    auth: false,
    creditCheck: false,
    proxy: {
      target: 'http://localhost:7000',
      changeOrigin: true,
    },
  },
]

export { ROUTES, Route }
