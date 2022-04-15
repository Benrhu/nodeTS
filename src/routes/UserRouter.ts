import express, { Request, Response } from 'express'
import { UserController } from '../controllers/UsersController'
import { LogInfo } from '../utils/logger'
import bodyParser from 'body-parser'

const jsonParser = bodyParser.json()
// Router from express
const usersRouter = express.Router()

usersRouter.route('/')

  .get(async (req: Request, res: Response) => {
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    const controller: UserController = new UserController()
    // Obtain Response
    const response: any = await controller.getUsers(id)
    return res.status(200).send(response)
  })

  .delete(async (req:Request, res: Response) => {
    // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    LogInfo(`Query Param: ${id}`)
    // Controller Instance to excute method
    const controller: UserController = new UserController()
    // Obtain Reponse
    const response: any = await controller.deleteUser(id)
    // Send to the client the response
    return res.status(200).send(response)
  })

  .post(jsonParser, async (req:Request, res: Response) => {
    const name: any = req?.query?.name
    const age: any = req?.query?.age
    const email: any = req?.query?.email

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name || 'dafault',
      email: email || 'default email',
      age: age || 18
    }

    // Obtain Response
    const response: any = await controller.createUser(user)
    // Send to the client the response
    return res.send(response)
  })
  .put(async (req:Request, res: Response) => {
  // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    LogInfo(`Query Params: ${id}, ${name}, ${age}, ${email}`)

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name,
      email: email,
      age: age
    }

    // Obtain Response
    const response: any = await controller.updateUser(id, user)

    // Send to the client the response
    return res.send(response)
  })

export default usersRouter
