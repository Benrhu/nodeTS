import dotenv from 'dotenv'
import server from './src/server'
import { LogError, LogSuccess } from './src/utils/logger'

dotenv.config()

const port = process.env.PORT || 8081

// Execute server

server.listen(port, () => {
  LogSuccess(`[SERVER OB]: Running in https://localhost:${port}/api`)
})

// Control SERVER ERROR
server.on('error', (error) => {
  LogError(`[SERVER ERROR]: ${error}`)
})
