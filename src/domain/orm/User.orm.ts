import { userEntity } from '../entities/User.entity'

import { LogError } from '../../utils/logger'
import { IUser } from '../interfaces/IUser.interface'
import { IAuth } from '../interfaces/IAuth.interface'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.SECRETWORD || 'MYSECRETKEY'
// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */

export const getAllUsers = async (): Promise<any[] | undefined> => {
  try {
    const userModel = userEntity()

    // Search all users
    return await userModel.find({ isDelete: false })
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Users: ${error}`)
  }
}
export const getUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Search User By ID
    return await userModel.findById(id)
  } catch (error) {
    LogError(`[ORM ERROR]: Getting User By ID: ${error}`)
  }
}

// - Delete User By ID
export const deleteUserByID = async (id: string): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Delete User BY ID
    return await userModel.deleteOne({ _id: id })
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting User By ID: ${error}`)
  }
}

// - Create New User
export const createUser = async (user:any): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / Insert new User
    return await userModel.create()
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User: ${error}`)
  }
}

// - Update User By ID
export const updateUserByID = async (
  id: string,
  user: any
): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Update User
    return await userModel.findByIdAndUpdate(id, user)
  } catch (error) {
    LogError(`[ORM ERROR]: Updating User ${id}: ${error}`)
  }
}

// Register User

export const registerUser = async (
  user: IUser
): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Create / Insert new User
    return await userModel.create(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
}

// Login User

export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    let userFound: IUser | undefined

    // Check if Password is Valid (compare with bcrypt)
    await userModel.findOne({ email: auth.email }).then((user: IUser) => {
      userFound = user
    }).catch((error) => {
      console.error('[ERROR in ORM]: User Not Found')
      throw new Error(`[ERROR in ORM]: User Not Found: ${error}`)
    })
    // Check if password  is valid (compare with bcrypt)
    const validPass = bcrypt.compareSync(auth.password, userFound!.password)

    if (!validPass) {
      console.error('[ERROR in ORM]: Password Not Valid')
      throw new Error('[ERROR in ORM]: Password Not Valid')
    }

    // Generate our JWT
    const token = jwt.sign({ email: userFound!.email }, secret, { expiresIn: '2h' })

    return {
      user: userFound,
      token: token
    }
  } catch (error) {
    console.error('[ERROR in ORM]: User Not Found')
    throw new Error('[ERROR in ORM]: User Not Found')
  }
}

// Logout User
/*
export const logoutUser = async (): Promise<any | undefined> => {
  try {
    const userModel = userEntity()

    // Update User
    return await userModel.logo(user)
  } catch (error) {
    LogError(`[ORM ERROR]: Creating User ${error}`)
  }
} */
