import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

// Configuration the .env file
dotenv.config()

// Create Express APP
const app: Express = express()
const port: string | number = process.env.PORT || 8081

// Define the first Route os APP

app.get('/', (req: Request, res: Response) => {
  // Send Header
  res.send('APP Express + TS + Swagger + ')
})

app.get('/data', (req: Request, res: Response) => {
  if (res.status(200)) {
    res.send({ data: { message: 'goodbye, world' } })
  }
})
app.get('/hello', (req: Request, res: Response) => {
  // Send Header
  const name = req.query.name
  return res.status(200).json({ data: { message: `Hola, ${name}` } })
})

// Execute APP and Listen Requests
app.listen(port, () => {
  console.log(`EXPRESS SERVER: Running at http://localhost:${port}`)
})
