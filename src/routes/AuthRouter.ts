import express, { Request, Response } from 'express'
import { AuthController } from '../controllers/AuthController'

import bcrypt from 'bcrypt'
// import { verifyToken } from '../middlewares/verifyToken.middleware'
import bodyParser from 'body-parser'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'
import { verifyToken } from '../middlewares/verifyToken.middleware'

const jsonParser = bodyParser.json()

const authRouter = express.Router()

authRouter.route('/register')
  .post(jsonParser, async (req:Request, res: Response) => {
    const { name, email, password, age } = req?.body

    if (name && password && email && age) {
      // Obtain the password in request and cypher
      const hashedPass = bcrypt.hashSync(password, 8)

      const newUser: IUser = {
        name,
        email,
        password: hashedPass,
        age
      }

      const controller: AuthController = new AuthController()
      // Obtain Response
      const response: any = await controller.registerUser(newUser)

      return res.status(200).send(response)
    }
  })

authRouter.route('/login')
  .post(jsonParser, async (req:Request, res: Response) => {
    const { email, password } = req?.body

    if (email && password) {
      const controller: AuthController = new AuthController()

      const auth: IAuth = {
        email,
        password
      }
      // Obtain Response
      const response: any = await controller.loginUser(auth)

      return res.status(200).send(response)
    } else {
      // Send to tehe client the response
      return res.status(400).send({
        message: '[ERROR User Data missing]: No user canbe registered'
      })
    }
  })

authRouter.route('/me')
  .get(verifyToken, async (req: Request, res: Response) => {
    // Obtain id of user
    const id: any = req?.query?.id

    if (id) {
      // Controller: Auth Controller
      const controller: AuthController = new AuthController()

      // Obtain response from Controller
      const response: any = await controller.userData(id)

      return res.status(200).send(response)
    } else {
      return res.status(401).send({
        message: 'You are not authorised to perform this action'
      })
    }
  })

// Route Protected by VERIFY TOKEN Middleware

export default authRouter
