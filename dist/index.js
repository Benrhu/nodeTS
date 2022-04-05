'use strict'
const importDefault = (this && this.importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
// eslint-disable-next-line camelcase
const express_1 = importDefault(require('express'))
// eslint-disable-next-line camelcase
const dotenv_1 = importDefault(require('dotenv'))
// Configuration the .env file
dotenv_1.default.config()
// Create Express APP
const app = (0, express_1.default)()
const port = process.env.PORT || 8081
// Define the first Route os APP
app.get('/', (req, res) => {
  // Send Header
  res.send('APP Express + TS + Swagger + Mongoose ')
})
app.get('/data', (req, res) => {
  if (res.status(200)) {
    res.send({ data: { message: 'goodbye, world' } })
  }
})

app.get('/hello', (req, res) => {
  // Send Header
  const name = 'Nombre'
  return res.status(200).json({ data: { message: `Hola, ${name}` } })
})
// Execute APP and Listen Requests
app.listen(port, () => console.log(`EXPRESS SERVER: Running at http://localhost:${port}`))
// # sourceMappingURL=index.js.map
