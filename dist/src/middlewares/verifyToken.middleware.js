"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Config dotenv to read enviroment variables
dotenv_1.default.config();
const secret = process.env.SECRETWORD || 'MYSECRETKEY';
/**
 * @param { Request} Original request previous middleware of vervification JWT
 * @param { Response} Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification or next execution
 */
const verifyToken = (req, res, next) => {
    // CHECK header FROM Request for 'x-access-token'
    const token = req.headers['x-access-token'];
    // Verify i jwt is present
    if (!jsonwebtoken_1.default) {
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not autorised to consume this endpoint'
        });
    }
    // Verify the token obtained
    // TODO: pass secret key
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failedto verify JWT token in request'
            });
        }
        // Passing something to next request (id of user || other info)
        // Execite Next Function -> Protected Routes will executed
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.middleware.js.map