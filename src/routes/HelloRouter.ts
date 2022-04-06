import express, { Request, Response } from 'express'
import { HelloController } from '../controllers/HelloController'
import { LogInfo } from '../utils/logger'

// Router from express
const helloRouter = express.Router()

// http://localhost:8081/api/hello
helloRouter.route('/').get(async (req: Request, res: Response) => {
  // Obtain a Query Param
  const name: any = req?.query?.name
  LogInfo(`Query Param: ${name}`)
  // Controller instance to execute method
  const controller: HelloController = new HelloController()
  // Obtain Response
  const response = await controller.getMessage(name)
  return res.send(response)
}
)

export default helloRouter
