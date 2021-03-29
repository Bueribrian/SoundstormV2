"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
let stringRequired = {
    type: String,
    required: true,
};
const UserSchema = new Schema({
    name: stringRequired,
    last_name: stringRequired,
    password: stringRequired,
    email: stringRequired,
    role: {
        type: String,
        default: "guest",
    },
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });
module.exports = mongoose_1.default.model(UserSchema, "User");
//# sourceMappingURL=user.js.map