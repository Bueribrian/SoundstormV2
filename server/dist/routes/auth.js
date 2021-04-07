"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controller/auth"));
const auth = express_1.default.Router();
auth.post("/login", auth_1.default.login);
auth.post("/register", auth_1.default.register);
auth.get("/users", auth_1.default.allUsers);
exports.default = auth;
//# sourceMappingURL=auth.js.map