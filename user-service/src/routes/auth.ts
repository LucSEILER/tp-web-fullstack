import { json } from 'express'
import { Route } from './serveRoutes'
import jwt from 'jsonwebtoken'
import userController  from '../controllers/user'

const AUTH_ROUTES: Route[] = [
  {
    url: '/',
    method: 'GET',
    callback: userController.getUsers,
  },
  {
    url: '/login',
    method: 'POST',
    callback: (req, res) => {
      // jwt token generation
      const { email, password } = req.body

      if (!email || !password) {
        return res.status(400).send({ message: 'Invalid credentials' })
      }

      if (password == 'password123') {
        const token = jwt.sign({ email, password }, 'secret', {
          expiresIn: '1h',
        })
        res.cookie('token', token, { httpOnly: true })
        res.send({ json })
      } else {
        res.status(401).send({ message: 'Invalid credentials' })
      }
    },
  },
  {
    url: '/',
    method: 'POST',
    callback: (req, res) => {
      res.send({ message: 'Auth service' })
    },
  },
  {
    url: '/<id>',
    method: 'GET',
    callback: (req, res) => {
      res.send({ message: 'Auth service' })
    },
  },
  {
    url: '/<id>',
    method: 'PUT',
    callback: (req, res) => {
      res.send({ message: 'Auth service' })
    },
  },
]

export { AUTH_ROUTES, Route }
