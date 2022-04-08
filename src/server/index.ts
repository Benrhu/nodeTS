import express, { Express, Request, Response } from 'express'

// Swagger
import swaggerUi from 'swagger-ui-express'

// Security
import cors from 'cors'
import helmet from 'helmet'

// TODO HTTPS

//  Root Router

import rootRouter from '../routes'
import mongoose from 'mongoose'

const server: Express = express()

// Swagger Configg and route

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
      explorer: true
    }
  })
)

// Define Server to use "/api" and use tootRouter from 'index.ts in routes

server.use('/api', rootRouter)

server.use(express.static('public'))

// TODO Mongoose Connection
mongoose.connect('mongodb://localhost:27017/')

// Security Config
server.use(cors())
server.use(helmet())

// Content Type Config

server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// http://localhost:8081 -> http://localhost:8081/api
server.get('/', (req: Request, res: Response) => {
  res.redirect('/api')
})

export default server
