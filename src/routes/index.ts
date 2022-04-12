/**
 * Root Router
 * Redirections to Routers
 */
import express, { Request, Response } from 'express'
import helloRouter from './HelloRouter'
import usersRouter from './UserRouter'
import { LogInfo } from '../utils/logger'

// Server instance

const server = express()

// Router instance

const rootRouter = express.Router()

// Activate  for requests to http://localhost:8081/api

rootRouter.get('/', (req: Request, res: Response) => {
  LogInfo('GET: http://localhost:8081/api')
  // Send Header
  res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger  + Mongoose')
})

// Redirections to Routers & Controllers

server.use('/', rootRouter) // http://localhost:8081/api
server.use('/hello', helloRouter) // http://localhost:8081/api/hello
server.use('/users', usersRouter)

// Add more routes to the app

export default server
