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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Auth = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { name, password } = req.body;
        console.log(name, password);
        if (!name || !password) {
            return res.json({ message: "Faltan campos por completar", data: {}, status: 202 }).status(202);
        }
        let user = yield user_1.default.findOne({ name: name });
        if (!user) {
            return res.json({
                message: "El usuario no existe",
                data: {},
                status: 404,
            }).s;
        }
        let passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatch) {
            let token = jsonwebtoken_1.default.sign({ name: user.name, role: user.role }, process.env.JWT_SECRET);
            return res
                .json({
                message: "Login OK!",
                data: {
                    name: user.name,
                    token,
                },
                status: 200,
            })
                .status(200);
        }
        else {
            res
                .json({
                message: "Password o nombre de usuario incorrecto",
                data: {},
                status: 400,
            })
                .status(400);
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let { name, password } = req.body;
        if (!name || !password) {
            return res
                .json({ message: "Faltan campos por completar", data: {}, status: 202 })
                .status(202);
        }
        else {
            let userExist = yield user_1.default.findOne({ name: name });
            console.log(userExist);
            if (!userExist) {
                let userCreated = yield user_1.default.create({ name, password });
                if (userCreated) {
                    return res
                        .json({
                        message: "Usuario creado con exito",
                        data: { name: userCreated.name },
                        status: 200,
                    })
                        .status(200);
                }
            }
            else {
                return res
                    .json({
                    message: "Usuario ya existe",
                    data: {},
                    status: 200,
                })
                    .status(404);
            }
        }
        return res
            .json({
            message: "Hay un problema al crear al usuario, intente mas tarde",
            data: {},
            status: 200,
        })
            .status(200);
    }),
    allUsers: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let users = yield user_1.default.find();
        res
            .json({
            message: "Users",
            users,
            status: 202,
        })
            .status(202);
    }),
    credentialsRequired: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let token = req.header("Basic");
        if (token) {
            try {
                let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                console.log(decoded);
                req.user = decoded;
                return next();
            }
            catch (err) {
                return res
                    .json({ message: "Error de credenciales", data: {}, status: 401 })
                    .status(401);
            }
        }
        else {
            res
                .json({
                message: "Necesitas un token para realizar esta operacion",
                data: {},
                status: 401,
            })
                .status(401);
        }
    }),
    adminCredentials: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user || req.user.role !== "admin") {
            return res
                .json({
                message: "Se necesitan credenciales de administrador para esta operacion",
                data: {},
                status: 401,
            })
                .status(401);
        }
        return next();
    }),
};
exports.default = Auth;
//# sourceMappingURL=auth.js.map