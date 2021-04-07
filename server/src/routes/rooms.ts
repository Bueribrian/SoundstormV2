import express from "express";
import RoomController from "../controller/rooms";
import AuthController from "../controller/auth";
const rooms = express.Router();

// TODO
// REQUERIR TOKEN
// HACER MIDDLEWARE

// Get all rooms
rooms.get("/", AuthController.credentialsRequired, RoomController.allRooms);

// Get one room
rooms.get(
  "/:id",
  AuthController.credentialsRequired,
  RoomController.getOneRoom
);

// Add One comment
rooms.patch(
  "/comment/add/:id",
  AuthController.credentialsRequired,
  RoomController.addOneComment
);

// Add one room
rooms.post(
  "/",
  AuthController.credentialsRequired,
  AuthController.adminCredentials,
  RoomController.createOneRoom
);

// Delete one room
rooms.delete(
  "/:id",
  AuthController.credentialsRequired,
  AuthController.adminCredentials,
  RoomController.deleteOneRoom
);

export default rooms;
