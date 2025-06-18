import { Application, Request, Response } from 'express'
import { AUTH_ROUTES } from './auth'

interface Route {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  callback: (req: Request, res: Response) => void
}

const generateRoutes = (app: Application) => {
  AUTH_ROUTES.forEach((route: Route) => {
    console.log(route.url)
    const { url, method, callback } = route
    if (method === 'GET') {
      console.log('GET')
      app.get(url, callback)
    } else if (method === 'POST') {
      console.log('POST')
    } else if (method === 'PUT') {
      console.log('PUT')
    } else if (method === 'DELETE') {
      console.log('DELETE')
    }
  })
}

export { generateRoutes, Route }
