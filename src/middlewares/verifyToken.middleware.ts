import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

// Config dotenv to read enviroment variables
dotenv.config()
const secret = process.env.SECRETWORD || 'MYSECRETKEY'
/**
 * @param { Request} Original request previous middleware of vervification JWT
 * @param { Response} Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // CHECK header FROM Request for 'x-access-token'
  const token: any = req.headers['x-access-token']

  // Verify i jwt is present
  if (!jwt) {
    return res.status(403).send({
      authenticationError: 'Missing JWT in request',
      message: 'Not autorised to consume this endpoint'
    })
  }

  // Verify the token obtained
  // TODO: pass secret key
  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification failed',
        message: 'Failedto verify JWT token in request'
      })
    }

    // Passing something to next request (id of user || other info)

    // Execite Next Function -> Protected Routes will executed
    next()
  })
}
