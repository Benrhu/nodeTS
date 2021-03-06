import { IUser } from '../../domain/interfaces/IUser.interface'
import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    // Read all users from database
    getUsers(id?: string): Promise<any>
    deleteUser(id?: string): Promise<any>
}

export interface IAuthController {
    registerUser(user: IUser): Promise<any>
    loginUser(auth: any): Promise<any>
}
