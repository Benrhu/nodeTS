"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kataEntity = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const kataEntity = () => {
    const userSchema = new mongoose_1.default.Schema({
        name: String,
        description: String,
        level: mongodb_1.Int32,
        user: String,
        date: Date,
        valoration: mongodb_1.Int32,
        chances: mongodb_1.Int32
    });
    return mongoose_1.default.model('Users', userSchema);
};
exports.kataEntity = kataEntity;
//# sourceMappingURL=Katas.entity.js.map