"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, Document } = mongoose_1.default;
const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    playlist: {
        type: [],
        default: {
            song: "https://www.youtube.com/watch?v=LoheCz4t2xc&ab_channel=systemofadownVEVO",
            created_at: Date.now(),
            updated_at: Date.now(),
            name: "System Of A Down - Hypnotize (Official Video)",
            thumbnail: "https://i.ytimg.com/vi/LoheCz4t2xc/mqdefault.jpg",
            user_id: 1,
        },
    },
    users: [Schema.Types.ObjectId],
    chat: {
        type: [
            {
                txt: String,
                date: {
                    type: Date,
                    default: Date.now(),
                },
                user: {
                    type: String,
                    required: true,
                },
            },
        ],
        default: {
            txt: "Bienvenido a la sala Default",
            date: Date.now(),
            user: 1,
        },
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
exports.default = mongoose_1.default.model("Room", RoomSchema);
//# sourceMappingURL=room.js.map