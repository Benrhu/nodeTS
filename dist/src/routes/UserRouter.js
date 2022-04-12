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
}));
/*  .post(async (req:Request, res: Response) => {
    const name: any = req?.query?.name
    const age: any = req?.query?.age
    const email: any = req?.query?.email

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name || 'dafault',
      email: email || 'default email',
      age: age || 18
    }

    // Obtain Response
    const response: any = await controller.createUser(user)
    // Send to the client the response
    return res.send(response)
  })
  .put(async (req:Request, res: Response) => {
  // Obtain a Query Param (ID)
    const id: any = req?.query?.id
    const name: any = req?.query?.name
    const email: any = req?.query?.email
    const age: any = req?.query?.age
    LogInfo(`Query Params: ${id}, ${name}, ${age}, ${email}`)

    // Controller Instance to excute method
    const controller: UserController = new UserController()

    const user = {
      name: name,
      email: email,
      age: age
    }

    // Obtain Response
    const response: any = await controller.updateUser(id, user)

    // Send to the client the response
    return res.send(response)
  }) */
exports.default = usersRouter;
//# sourceMappingURL=UserRouter.js.map