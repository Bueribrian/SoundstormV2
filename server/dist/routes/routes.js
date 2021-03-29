"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rooms = express_1.default.Router();
let roomsArr = [
    {
        id: 1,
        room_name: "8a",
        created_at: Date.now(),
        updated_at: Date.now(),
    },
];
// Get all rooms
rooms.get("/", (req, res) => {
    res.json({ message: "Rooms", data: roomsArr, status: 200 }).status(200);
});
// Get one room
rooms.get('/:id', (req, res) => {
    let room_id = Number(req.params.id);
    let room = roomsArr.find(({ id }) => id === room_id);
    res.json({ message: "Ok", data: [room], status: 200 }).status(200);
});
// Add one room
rooms.post('/', (req, res) => {
    let { room_name } = req.body;
    roomsArr.push({
        room_name,
        id: Math.round(Math.random() * 5000),
        created_at: Date.now(),
        updated_at: Date.now()
    });
    res.json({ message: "Room added successfully!", data: roomsArr, status: 200 }).status(200);
});
// // Delete one room
rooms.delete('/:id', (req, res) => {
    let room_id = Number(req.params.id);
    roomsArr = roomsArr.filter(({ id }) => id !== room_id);
    res.json({ message: "Room deleted Successfully", data: roomsArr, status: 200 }).status(200);
});
exports.default = rooms;
//# sourceMappingURL=routes.js.map