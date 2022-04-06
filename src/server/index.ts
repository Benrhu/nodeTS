import express, { Express, Request, Response } from 'express'

// Security
import cors from 'cors'
import helmet from 'helmet'

// TODO HTTPS

//  Root Router

import router from '../routes'

const server: Express = express()

// Define Server to use "/api" and use tootRouter from 'index.ts in routes

server.use('/api', router)

// TODO Mongoose Connection

// Security Config
server.use(cors)
server.use(helmet)

// Content Type Config

server.use(express.urlencoded({ extended: true, limit: '50mb' }))
server.use(express.json({ limit: '50mb' }))

// http://localhost:8081 -> http://localhost:8081/api
server.get('/', (req: Request, res: Response) => {
  res.redirect('api')
})

export default server
