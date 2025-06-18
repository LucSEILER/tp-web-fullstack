import { Application } from "express"
import { AUTH_ROUTES, Route } from "./routes/auth"

const ROUTES: Route[] = [
  ...AUTH_ROUTES
]

const setupRoutes = (app: Application) => {
  ROUTES.forEach(route => {
    app.use(route.url, )
  })
}

export { setupRoutes }
