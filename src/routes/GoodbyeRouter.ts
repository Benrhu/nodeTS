
import { HelloController } from '@/controllers/HelloController'
import express, { Request, Response } from 'express'
import { LogInfo } from '../utils/logger'

// Router from express
const goodbyeRouter = express.Router()

// http://localhost:8081/api/hello?name=Ruben
goodbyeRouter.route('/').get(async (req: Request, res: Response) => {
  // Obtain a Query Param
  const date: any = req?.query?.date
  LogInfo(`Query Param: ${Date}`)
  // Controller instance to execute method
  const controller: HelloController = new HelloController()
  // Obtain Response
  const response = await controller.getMessage(date)
  return res.send(response)
}
)

export default goodbyeRouter
