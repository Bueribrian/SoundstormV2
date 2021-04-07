"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms_1 = __importDefault(require("../controller/rooms"));
const auth_1 = __importDefault(require("../controller/auth"));
const rooms = express_1.default.Router();
// TODO
// REQUERIR TOKEN
// HACER MIDDLEWARE
// Get all rooms
rooms.get("/", auth_1.default.credentialsRequired, rooms_1.default.allRooms);
// Get one room
rooms.get("/:id", auth_1.default.credentialsRequired, rooms_1.default.getOneRoom);
// Add One comment
rooms.patch("/comment/add/:id", auth_1.default.credentialsRequired, rooms_1.default.addOneComment);
// Add one room
rooms.post("/", auth_1.default.credentialsRequired, auth_1.default.adminCredentials, rooms_1.default.createOneRoom);
// Delete one room
rooms.delete("/:id", auth_1.default.credentialsRequired, auth_1.default.adminCredentials, rooms_1.default.deleteOneRoom);
exports.default = rooms;
//# sourceMappingURL=rooms.js.map