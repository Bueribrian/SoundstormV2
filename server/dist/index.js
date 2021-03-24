"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const room_1 = __importDefault(require("./models/room"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const auth_1 = __importDefault(require("./routes/auth"));
const socketio_jwt_auth_1 = __importDefault(require("socketio-jwt-auth"));
const io = __importStar(require("socket.io"));
// App setup
dotenv_1.default.config();
const app = express_1.default();
const server = http_1.default.createServer(app);
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
const socketIo = new io.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.get("/", (req, res) => res.json({ message: "Hello world 🌎" }));
app.use("/rooms", rooms_1.default);
app.use("/auth", auth_1.default);
let messages = [
    {
        txt: "Hellow from the backend",
        date: Date.now(),
        id: "!12as@!__asD!2",
    },
];
let songs = [];
socketIo.use(socketio_jwt_auth_1.default.authenticate({
    secret: process.env.JWT_SECRET,
}, (payload, done) => {
    console.log(payload);
    console.log("Authentication passed!");
    return done(null, {});
}));
const RoomMethods = {
    getRooms: () => __awaiter(void 0, void 0, void 0, function* () {
        let rooms = yield room_1.default.find();
        return rooms;
    }),
    getChat: () => __awaiter(void 0, void 0, void 0, function* () {
        let { chat } = yield room_1.default.findById({
            _id: "605a5545df0314b31cea8432",
        });
        return chat;
    }),
    addComment: ({ txt, user }) => __awaiter(void 0, void 0, void 0, function* () {
        let comment = yield room_1.default.findByIdAndUpdate({ _id: "605a5545df0314b31cea8432" }, { $push: { chat: { txt, user } } });
    }),
};
let usersConnected = [];
socketIo.on("connection", function (socket) {
    return __awaiter(this, void 0, void 0, function* () {
        // let roomChat = await RoomMethods.getChat();
        // console.log(socket)
        // let rooms = await RoomMethods.getRooms()
        usersConnected = [...usersConnected, socket.id];
        console.log("Connected clients:", usersConnected);
        socket.emit("init", { hello: "world" });
        socket.emit("id", socket.id);
        socketIo.emit("users", usersConnected);
        socketIo.emit("messages", yield RoomMethods.getChat());
        socketIo.emit("songs", songs);
        socket.on('room', (room => {
            socket.join(room);
        }));
        socket.on("addSong", (data) => {
            songs.unshift(data);
            console.log(data);
            console.log(songs);
            socketIo.emit("songs", songs);
        });
        socket.on("addMessage", (message) => __awaiter(this, void 0, void 0, function* () {
            RoomMethods.addComment(message);
            console.log(message);
            socketIo.emit("messages", yield RoomMethods.getChat());
        }));
        socket.on("disconnect", () => {
            usersConnected = usersConnected.filter((user) => user !== socket.id);
            socket.disconnect();
            socketIo.emit("users", usersConnected);
            console.log("Connected clients:", usersConnected);
        });
    });
});
server.listen(4000, () => {
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
        console.log("Database connected 🙌");
    });
    console.log("✨️ Server on port 4000");
});
//# sourceMappingURL=index.js.map