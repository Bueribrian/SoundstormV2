import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import Room from "./models/room";
import User from "./models/user";
import rooms from "./routes/rooms";
import videos from "./routes/videos";
import auth from "./routes/auth";
import jwtAuth from "socketio-jwt-auth";
import * as io from "socket.io";

// App setup
const app = express();
const server = http.createServer(app);
dotenv.config();
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
const socketIo = new io.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello world 🌎" }));
app.use("/videos", videos);
app.get("/v", (req, res) => res.json({ msg: "works" }));
app.use("/rooms", rooms);
app.use("/auth", auth);

socketIo.use(
  jwtAuth.authenticate(
    {
      secret: process.env.JWT_SECRET,
    },
    (payload, done) => {
      // you done callback will not include any payload data now
      // if no token was supplied
      if (payload && payload.name) {
        User.findOne({ name: payload.name }, function (err, user) {
          if (err) {
            // return error
            return done(err);
          }
          if (!user) {
            // return fail with an error message
            return done(null, false, "user does not exist");
          }
          // return success with a user info
          return done(null, user);
        });
      } else {
        return done(); // in your connection handler user.logged_in will be false
      }
    }
  )
);

const RoomMethods = {
  getRooms: async (id) => {
    let rooms = await Room.find();
    return rooms;
  },
  getChat: async (id) => {
    try {
      let room: any = await Room.findById({
        _id: id,
      });
      // console.log(room);
      return room.chat;
    } catch (err) {
      (err) => {
        console.error(err);
      };
    }
  },
  addComment: async ({ txt, user }, id) => {
    let comment = await Room.findByIdAndUpdate(
      { _id: id },
      { $push: { chat: { txt, user } } }
    );
  },
  getSongs: async (id) => {
    try {
      let room: any = await Room.findById({
        _id: id,
      });
      // console.log(room);
      return room.playlist;
    } catch (err) {
      (err) => {
        console.error(err);
      };
    }
  },
  addSong: async ({ song, user, name, thumbnail }, id) => {
    let Song = await Room.findByIdAndUpdate(
      { _id: id },
      { $push: { playlist: { song, user, name, thumbnail, date: Date.now() } } }
    );
  },
};

let usersConnected: string[] = [];

socketIo.on("connection", async function (socket) {
  usersConnected = [...usersConnected, socket.id];
  console.log("Connected clients:", usersConnected);
  let socketRoom;
  socket.on("join", async (room) => {
    console.log(`Socket ${socket.id} joining ${room}`);
    socket.join(room);
    socketRoom = room
    socketIo.to(room).emit("users", usersConnected);
    socketIo.to(room).emit('messages', await RoomMethods.getChat(room))
    socketIo.to(room).emit('songs', await RoomMethods.getSongs(room))
  });
 
  
  socket.on("addSong", async (data) => {
    let { song, room } = data;
    RoomMethods.addSong(song, room);
    socketIo.to(room).emit("songs", await RoomMethods.getSongs(room));
  });

  socket.on("addMessage", async (data) => {
    let { message, room } = data;
    RoomMethods.addComment(message,  room);
    socketIo.to(room).emit("messages", await RoomMethods.getChat(room));
  });

  socket.on("disconnect", (room) => {
    usersConnected = usersConnected.filter((user) => user !== socket.id);
    socketIo.to(room).emit("users", usersConnected);
    socket.disconnect();
    console.log("Connected clients:", usersConnected);
  });
});

server.listen(4000, () => {
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Database connected 🙌");
  });
  console.log("✨️ Server on port 4000");
});
