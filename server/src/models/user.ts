import mongoose from "mongoose";
const { Schema } = mongoose;

let stringRequired = {
  type: String,
  required: true,
};

const UserSchema = new Schema(
  {
    name: stringRequired,
    last_name: stringRequired,
    password: stringRequired,
    email: stringRequired,
    role: {
      type: String,
      default: "guest",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model(UserSchema, "User");
