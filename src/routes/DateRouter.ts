import express, { Request, Response } from 'express'
import { HelloController } from '../controllers/HelloController'
import { LogInfo } from '../utils/logger'

// Router from express
const dateRouter = express.Router()

// http://localhost:8081/api/hello?name=Ruben
dateRouter.route('/').get(async (req: Request, res: Response) => {
  // Obtain a Query Param
  const date: any = req?.query?.date
  LogInfo(`Actual Date: ${date}`)
  // Controller instance to execute method
  const controller: HelloController = new HelloController()
  // Obtain Response
  const response = await controller.getDate(date)
  return res.send(response)
}
)

export default dateRouter
