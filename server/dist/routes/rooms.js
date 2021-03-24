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
const room_1 = __importDefault(require("../models/room"));
const rooms = express_1.default.Router();
// Get all rooms
rooms.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let rooms = yield room_1.default.find();
    res.json({ message: "Rooms", data: rooms, status: 200 }).status(200);
}));
// Get one room
rooms.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let room_id = req.params.id;
    let room = yield room_1.default.findById({ _id: room_id });
    res.json({ message: "Ok", data: [room], status: 200 }).status(200);
}));
rooms.patch("/comment/add/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let room_id = req.params.id;
    let { txt, date = Date.now(), user = 1 } = req.body;
    let room = yield room_1.default.findByIdAndUpdate({ _id: room_id }, { $push: { chat: { txt, date, user } } });
    res.json({ message: "Updated", data: [room], status: 200 }).status(200);
}));
// Add one room
// TODO Hacer widllerware para auth que me de el usuario del token
rooms.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name } = req.body;
    let room = yield room_1.default.create({
        name,
    });
    res
        .json({ message: "Room added successfully!", data: room, status: 200 })
        .status(200);
}));
// // Delete one room
rooms.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let room_id = req.params.id;
    let deletedRoom = yield room_1.default.findByIdAndDelete({ _id: room_id });
    res
        .json({
        message: "Room deleted Successfully",
        data: deletedRoom,
        status: 200,
    })
        .status(200);
}));
exports.default = rooms;
//# sourceMappingURL=rooms.js.map