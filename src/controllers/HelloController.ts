import { Get, Query, Route, Tags } from 'tsoa'
import { BasicResponse } from './types'
import { IHelloController } from './interfaces'
import { LogSuccess } from '../utils/logger'

@Route('/api/hello')
@Tags('HelloController')
export class HelloController implements IHelloController {
  /**
   * Endpoint to retrieve a Message "Hello {name}" in JSON
   * @param name Name of user to be  greeted
   * @param date Actual date
   * @returns {} Promise of BasicResponse and DateResponse
   */

  @Get('/')
  public async getMessage (@Query()name?: string): Promise<BasicResponse> {
    LogSuccess('[/api/hello] Get Request')
    return { message: `Helo World ${name || 'Rubén'}` }
  }
}
