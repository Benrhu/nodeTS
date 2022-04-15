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
const UsersController_1 = require("../controllers/UsersController");
const logger_1 = require("../utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const jsonParser = body_parser_1.default.json();
// Router from express
const usersRouter = express_1.default.Router();
usersRouter.route('/')
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    const controller = new UsersController_1.UserController();
    // Obtain Response
    const response = yield controller.getUsers(id);
    return res.status(200).send(response);
}))
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtain a Query Param (ID)
    const id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    // Obtain Reponse
    const response = yield controller.deleteUser(id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    const name = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.name;
    const age = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.age;
    const email = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.email;
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    const user = {
        name: name || 'dafault',
        email: email || 'default email',
        age: age || 18
    };
    // Obtain Response
    const response = yield controller.createUser(user);
    // Send to the client the response
    return res.send(response);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g, _h, _j;
    // Obtain a Query Param (ID)
    const id = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.id;
    const name = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.name;
    const email = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.email;
    const age = (_j = req === null || req === void 0 ? void 0 : req.query) === null || _j === void 0 ? void 0 : _j.age;
    (0, logger_1.LogInfo)(`Query Params: ${id}, ${name}, ${age}, ${email}`);
    // Controller Instance to excute method
    const controller = new UsersController_1.UserController();
    const user = {
        name: name,
        email: email,
        age: age
    };
    // Obtain Response
    const response = yield controller.updateUser(id, user);
    // Send to the client the response
    return res.send(response);
}));
exports.default = usersRouter;
//# sourceMappingURL=UserRouter.js.map