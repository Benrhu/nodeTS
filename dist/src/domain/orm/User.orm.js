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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.updateUserByID = exports.createUser = exports.deleteUserByID = exports.getUserByID = exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRETWORD || 'MYSECRETKEY';
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
// - Delete User By ID
const deleteUserByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Delete User BY ID
        return yield userModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Deleting User By ID: ${error}`);
    }
});
exports.deleteUserByID = deleteUserByID;
// - Create New User
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Create / Insert new User
        return yield userModel.create();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User: ${error}`);
    }
});
exports.createUser = createUser;
// - Update User By ID
const updateUserByID = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Update User
        return yield userModel.findByIdAndUpdate(id, user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating User ${id}: ${error}`);
    }
});
exports.updateUserByID = updateUserByID;
// Register User
const registerUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        // Create / Insert new User
        return yield userModel.create(user);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating User ${error}`);
    }
});
exports.registerUser = registerUser;
// Login User
const loginUser = (auth) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        let userFound;
        // Check if Password is Valid (compare with bcrypt)
        yield userModel.findOne({ email: auth.email }).then((user) => {
            userFound = user;
        }).catch((error) => {
            console.error('[ERROR in ORM]: User Not Found');
            throw new Error(`[ERROR in ORM]: User Not Found: ${error}`);
        });
        // Check if password  is valid (compare with bcrypt)
        const validPass = bcrypt_1.default.compareSync(auth.password, userFound.password);
        if (!validPass) {
            console.error('[ERROR in ORM]: Password Not Valid');
            throw new Error('[ERROR in ORM]: Password Not Valid');
        }
        // Generate our JWT
        const token = jsonwebtoken_1.default.sign({ email: userFound.email }, secret, { expiresIn: '2h' });
        return {
            user: userFound,
            token: token
        };
    }
    catch (error) {
        console.error('[ERROR in ORM]: User Not Found');
        throw new Error('[ERROR in ORM]: User Not Found');
    }
});
exports.loginUser = loginUser;
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
//# sourceMappingURL=User.orm.js.map