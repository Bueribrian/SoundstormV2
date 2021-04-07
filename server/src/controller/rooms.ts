import Room from "../models/room";

const RoomController = {
  allRooms: async (req, res) => {
    let rooms = await Room.find();
    res.json({ message: "Rooms", data: rooms, status: 200 }).status(200);
  },
  getOneRoom: async (req, res) => {
    let room_id = req.params.id;
    let room = await Room.findById({ _id: room_id });
    res.json({ message: "Ok", data: [room], status: 200 }).status(200);
  },
  createOneRoom: async (req, res) => {
    let { name } = req.body;
    let roomExist = await Room.findOne({ name });
    if (!roomExist) {
      let room = await Room.create({
        name,
      });
      res
        .json({
          message: "Room creada satistactoriamente",
          data: room,
          status: 200,
        })
        .status(200);
    } else {
      res
        .json({
          message: "Una room con ese nombre ya existe",
          data: { name },
          status: 400,
        })
        .status(400);
    }
  },
  deleteOneRoom: async (req, res) => {
    let room_id = req.params.id;
    let deletedRoom = await Room.findByIdAndDelete({ _id: room_id });
    res
      .json({
        message: "Room deleted Successfully",
        data: deletedRoom,
        status: 200,
      })
      .status(200);
  },
  addOneComment: async (req, res) => {
    let room_id = req.params.id;
    let { txt, date = Date.now(), user = 1 } = req.body;
    let room = await Room.findByIdAndUpdate(
      { _id: room_id },
      { $push: { chat: { txt, date, user } } }
    );
    if (!room) {
      return res
        .json({ message: "Room no existe", data: {}, status: 400 })
        .status(200);
    }
    res.json({ message: "Updated", data: [room], status: 200 }).status(200);
  },
};

export default RoomController;
