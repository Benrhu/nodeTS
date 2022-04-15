import { Route, Tags, Post, Get, Query } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogSuccess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/interfaces/IUser.interface'
import { IAuth } from '../domain/interfaces/IAuth.interface'

// ORM - Users Collection
import { registerUser, loginUser, getUserByID } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
  @Post('/register')
  public async registerUser (user: IUser): Promise<any> {
    let response: any = ''

    if (user) {
      LogSuccess(`[/api/auth/register] Register new user: ${user.email} `)
      await registerUser(user).then((r) => {
        LogSuccess(`[/api/users] Create User: ${user.email} `)
        response = {
          message: `User created successfully: ${user.name}`
        }
      })
    } else {
      LogWarning('[/api/auth/register] Register needs User')
      response = {
        message: 'User not registered: please, provide an User Entity to create one'
      }
    }
    return response
  }

  @Post('/login')
  public async loginUser (auth: IAuth): Promise<any> {
    let response: AuthResponse | ErrorResponse | undefined

    if (auth) {
      LogSuccess(`[/api/auth/login] Logn User: ${auth.email} `)
      const data = await loginUser(auth)
      response = {
        token: data.token,
        message: `Welcome, ${data.user.name}`
      }
    } else {
      LogWarning('[/api/auth/login] Login needs Auth Entity(email && password)')
      response = {
        error: '[AUTH ERROR]: Email & Password are needed',
        message: 'Please, provide an User to create one'
      }
    }
    return response
  }
  /**
     * Endpoint to retreive the User in the Collection "Users" of DB
     * Middleware: Validate JWT
     * In headers you must add the x-access-token with a valid JWT
     * @param {string} id Id of user to retreive (optional)
     * @returns All user o user found by iD
     */

  @Get('/me')
  public async userData (@Query()id: string): Promise<any> {
    let response: any = ''

    if (id) {
      LogSuccess(`[/api/users] Get User Data By ID: ${id} `)
      response = await getUserByID(id)
      // Remove the password
      response.password = ''
    }
    return response
  }
}
