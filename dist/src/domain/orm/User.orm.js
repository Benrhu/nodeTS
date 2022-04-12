"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// CRUD
/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Search all users
        return yield userModel.find({ isDelete: false });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users: ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
const getUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Search User By ID
        return yield userModel.findById(id);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
});
exports.getUserByID = getUserByID;
/*
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
export const createUser = async (): Promise<any | undefined> => {
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
} */
//# sourceMappingURL=User.orm.js.map