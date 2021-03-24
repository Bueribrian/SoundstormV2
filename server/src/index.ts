import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import Room from "./models/room";
import rooms from "./routes/rooms";
import auth from "./routes/auth";
import jwtAuth from "socketio-jwt-auth";
import * as io from "socket.io";
// App setup
dotenv.config();

const app = express();
const server = http.createServer(app);
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
app.use("/rooms", rooms);
app.use("/auth", auth);

let messages: object[] = [
  {
    txt: "Hellow from the backend",
    date: Date.now(),
    id: "!12as@!__asD!2",
  },
];


let songs: object[] = [];

socketIo.use(
  jwtAuth.authenticate(
    {
      secret: process.env.JWT_SECRET,
    },
    (payload, done) => {
      console.log(payload);
      console.log("Authentication passed!");
      return done(null, {});
    }
  )
);

const RoomMethods = {
  getRooms: async () => {
    let rooms = await Room.find()
    return rooms
  },
  getChat: async () => {
    let { chat }: any = await Room.findById({
      _id: "605a5545df0314b31cea8432",
    });
    return chat;
  },
  addComment: async ({ txt, user }) => {
    let comment = await Room.findByIdAndUpdate(
      { _id: "605a5545df0314b31cea8432" },
      { $push: { chat: { txt, user } } }
    );
  },
};

let usersConnected: string[] = [];

socketIo.on("connection", async function (socket) {
  // let roomChat = await RoomMethods.getChat();
  // console.log(socket)
  // let rooms = await RoomMethods.getRooms()

  usersConnected = [...usersConnected, socket.id];
  console.log("Connected clients:", usersConnected);

  socket.emit("init", { hello: "world" });
  socket.emit("id", socket.id);

  socketIo.emit("users", usersConnected);
  socketIo.emit("messages", await RoomMethods.getChat());
  socketIo.emit("songs", songs);

  socket.on('room',(room =>{
    socket.join(room)
  }))

  socket.on("addSong", (data) => {
    songs.unshift(data);
    console.log(data);
    console.log(songs);
    socketIo.emit("songs", songs);
  });

  socket.on("addMessage", async (message) => {
    RoomMethods.addComment(message);
    console.log(message);
    socketIo.emit("messages", await RoomMethods.getChat());
  });

  socket.on("disconnect", () => {
    usersConnected = usersConnected.filter((user) => user !== socket.id);
    socket.disconnect();
    socketIo.emit("users", usersConnected);
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
