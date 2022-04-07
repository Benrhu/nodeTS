import { BasicResponse, DateResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

export class HelloController implements IHelloController {
  public async getDate (date?: Date): Promise<DateResponse> {
    return { date: new Date() }
  }

  public async getMessage (name?: string): Promise<BasicResponse> {
    LogSuccess('[/api/hello] Get Request')
    return { message: `Helo World ${name || 'Rubén'}` }
  }
}
