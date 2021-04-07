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
const user_1 = __importDefault(require("./models/user"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const videos_1 = __importDefault(require("./routes/videos"));
const auth_1 = __importDefault(require("./routes/auth"));
const socketio_jwt_auth_1 = __importDefault(require("socketio-jwt-auth"));
const io = __importStar(require("socket.io"));
// App setup
const app = express_1.default();
const server = http_1.default.createServer(app);
dotenv_1.default.config();
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
app.use("/videos", videos_1.default);
app.get("/v", (req, res) => res.json({ msg: "works" }));
app.use("/rooms", rooms_1.default);
app.use("/auth", auth_1.default);
socketIo.use(socketio_jwt_auth_1.default.authenticate({
    secret: process.env.JWT_SECRET,
}, (payload, done) => {
    // you done callback will not include any payload data now
    // if no token was supplied
    if (payload && payload.name) {
        user_1.default.findOne({ name: payload.name }, function (err, user) {
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
    }
    else {
        return done(); // in your connection handler user.logged_in will be false
    }
}));
const RoomMethods = {
    getRooms: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let rooms = yield room_1.default.find();
        return rooms;
    }),
    getChat: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let room = yield room_1.default.findById({
                _id: id,
            });
            // console.log(room);
            return room.chat;
        }
        catch (err) {
            (err) => {
                console.error(err);
            };
        }
    }),
    addComment: ({ txt, user }, id) => __awaiter(void 0, void 0, void 0, function* () {
        let comment = yield room_1.default.findByIdAndUpdate({ _id: id }, { $push: { chat: { txt, user } } });
    }),
    getSongs: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let room = yield room_1.default.findById({
                _id: id,
            });
            // console.log(room);
            return room.playlist;
        }
        catch (err) {
            (err) => {
                console.error(err);
            };
        }
    }),
    addSong: ({ song, user, name, thumbnail }, id) => __awaiter(void 0, void 0, void 0, function* () {
        let Song = yield room_1.default.findByIdAndUpdate({ _id: id }, { $push: { playlist: { song, user, name, thumbnail, date: Date.now() } } });
    }),
};
let usersConnected = [];
socketIo.on("connection", function (socket) {
    return __awaiter(this, void 0, void 0, function* () {
        usersConnected = [...usersConnected, socket.id];
        console.log("Connected clients:", usersConnected);
        let socketRoom;
        socket.on("join", (room) => __awaiter(this, void 0, void 0, function* () {
            console.log(`Socket ${socket.id} joining ${room}`);
            socket.join(room);
            socketRoom = room;
            socketIo.to(room).emit("users", usersConnected);
            socketIo.to(room).emit('messages', yield RoomMethods.getChat(room));
            socketIo.to(room).emit('songs', yield RoomMethods.getSongs(room));
        }));
        socket.on("addSong", (data) => __awaiter(this, void 0, void 0, function* () {
            let { song, room } = data;
            RoomMethods.addSong(song, room);
            socketIo.to(room).emit("songs", yield RoomMethods.getSongs(room));
        }));
        socket.on("addMessage", (data) => __awaiter(this, void 0, void 0, function* () {
            let { message, room } = data;
            RoomMethods.addComment(message, room);
            socketIo.to(room).emit("messages", yield RoomMethods.getChat(room));
        }));
        socket.on("disconnect", (room) => {
            usersConnected = usersConnected.filter((user) => user !== socket.id);
            socketIo.to(room).emit("users", usersConnected);
            socket.disconnect();
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