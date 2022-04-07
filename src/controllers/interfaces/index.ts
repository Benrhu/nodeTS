import { BasicResponse, DateResponse } from '../types'

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>
    getDate(date?: Date): Promise<DateResponse>
}
