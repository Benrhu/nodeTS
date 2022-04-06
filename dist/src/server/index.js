"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// TODO HTTPS
//  Root Router
const routes_1 = __importDefault(require("../routes"));
const server = (0, express_1.default)();
// Define Server to use "/api" and use tootRouter from 'index.ts in routes
server.use('/api', routes_1.default);
// TODO Mongoose Connection
// Security Config
server.use(cors_1.default);
server.use(helmet_1.default);
// Content Type Config
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
// http://localhost:8081 -> http://localhost:8081/api
server.get('/', (req, res) => {
    res.redirect('/api');
});
exports.default = server;
//# sourceMappingURL=index.js.map