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
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { verifyToken } from '../middlewares/verifyToken.middleware'
const body_parser_1 = __importDefault(require("body-parser"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const jsonParser = body_parser_1.default.json();
const authRouter = express_1.default.Router();
authRouter.route('/register')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, age } = req === null || req === void 0 ? void 0 : req.body;
    if (name && password && email && age) {
        // Obtain the password in request and cypher
        const hashedPass = bcrypt_1.default.hashSync(password, 8);
        const newUser = {
            name,
            email,
            password: hashedPass,
            age
        };
        const controller = new AuthController_1.AuthController();
        // Obtain Response
        const response = yield controller.registerUser(newUser);
        return res.status(200).send(response);
    }
}));
authRouter.route('/login')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req === null || req === void 0 ? void 0 : req.body;
    if (email && password) {
        const controller = new AuthController_1.AuthController();
        const auth = {
            email,
            password
        };
        // Obtain Response
        const response = yield controller.loginUser(auth);
        return res.status(200).send(response);
    }
    else {
        // Send to tehe client the response
        return res.status(400).send({
            message: '[ERROR User Data missing]: No user canbe registered'
        });
    }
}));
authRouter.route('/me')
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtain id of user
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    if (id) {
        // Controller: Auth Controller
        const controller = new AuthController_1.AuthController();
        // Obtain response from Controller
        const response = yield controller.userData(id);
        return res.status(200).send(response);
    }
    else {
        return res.status(401).send({
            message: 'You are not authorised to perform this action'
        });
    }
}));
// Route Protected by VERIFY TOKEN Middleware
exports.default = authRouter;
//# sourceMappingURL=AuthRouter.js.map