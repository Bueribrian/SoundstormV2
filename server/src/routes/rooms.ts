import express from "express";
import Room from "../models/room";
const rooms = express.Router();

// Get all rooms
rooms.get("/", async (req, res) => {
  let rooms = await Room.find();
  res.json({ message: "Rooms", data: rooms, status: 200 }).status(200);
});

// Get one room
rooms.get("/:id", async (req, res) => {
  let room_id = req.params.id;
  let room = await Room.findById({ _id: room_id });
  res.json({ message: "Ok", data: [room], status: 200 }).status(200);
});

rooms.patch("/comment/add/:id", async (req, res) => {
  let room_id = req.params.id;
  let { txt, date = Date.now(), user = 1 } = req.body;
  let room = await Room.findByIdAndUpdate(
    { _id: room_id },
    { $push: { chat: { txt, date, user } } }
  );
  res.json({ message: "Updated", data: [room], status: 200 }).status(200);
});

// Add one room
// TODO Hacer widllerware para auth que me de el usuario del token
rooms.post("/", async (req, res) => {
  let { name } = req.body;
  let room = await Room.create({
    name,
  });

  res
    .json({ message: "Room created successfully!", data: room, status: 200 })
    .status(200);
});

// // Delete one room
rooms.delete("/:id", async (req, res) => {
  let room_id = req.params.id;
  let deletedRoom = await Room.findByIdAndDelete({ _id: room_id });
  res
    .json({
      message: "Room deleted Successfully",
      data: deletedRoom,
      status: 200,
    })
    .status(200);
});

export default rooms;
