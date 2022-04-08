import { Int32 } from 'mongodb'
import mongoose from 'mongoose'

export const kataEntity = () => {
  const userSchema = new mongoose.Schema(
    {
      name: String,
      description: String,
      level: Int32,
      user: String,
      date: Date,
      valoration: Int32,
      chances: Int32
    }
  )
  return mongoose.model('Users', userSchema)
}
