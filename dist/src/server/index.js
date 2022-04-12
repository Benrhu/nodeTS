"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// TODO HTTPS
//  Root Router
const routes_1 = __importDefault(require("../routes"));
const mongoose_1 = __importDefault(require("mongoose"));
const server = (0, express_1.default)();
// Swagger Configg and route
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: '/swagger.json',
        explorer: true
    }
}));
// Define Server to use "/api" and use tootRouter from 'index.ts in routes
server.use('/api', routes_1.default);
server.use(express_1.default.static('public'));
// TODO Mongoose Connection
mongoose_1.default.connect('mongodb://localhost:27017/NodeTS');
// Security Config
server.use((0, cors_1.default)());
server.use((0, helmet_1.default)());
// Content Type Config
server.use(express_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(express_1.default.json({ limit: '50mb' }));
// http://localhost:8081 -> http://localhost:8081/api
server.get('/', (req, res) => {
    res.redirect('/api');
});
exports.default = server;
//# sourceMappingURL=index.js.map