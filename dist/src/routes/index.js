"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Root Router
 * Redirections to Routers
 */
const express_1 = __importDefault(require("express"));
const HelloRouter_1 = __importDefault(require("./HelloRouter"));
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const logger_1 = require("../utils/logger");
// Server instance
const server = (0, express_1.default)();
// Router instance
const rootRouter = express_1.default.Router();
// Activate  for requests to http://localhost:8081/api
rootRouter.get('/', (req, res) => {
    (0, logger_1.LogInfo)('GET: http://localhost:8081/api');
    // Send Header
    res.send('Welcome to my API Restful: Express + TS + Nodemon + Jest + Swagger  + Mongoose');
});
// Redirections to Routers & Controllers
server.use('/', rootRouter); // http://localhost:8081/api
server.use('/hello', HelloRouter_1.default); // http://localhost:8081/api/hello
server.use('/users', UserRouter_1.default); // http://localhost:8081/api/users
server.use('/auth', AuthRouter_1.default); // http://localhost:8081/api/auth
// Add more routes to the app
exports.default = server;
//# sourceMappingURL=index.js.map