import { BasicResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    // Read all users from database
    getUsers(id?: string): Promise<any>
    deleteUser(id?: string): Promise<any>
    createUser(user: any): Promise<any>
}
