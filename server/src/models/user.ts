import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema, Document } = mongoose;

interface UserI extends Document {
  name: string;
  password: string;
  role: string;
}

let stringRequired = {
  type: String,
  required: true,
};

const UserSchema: Schema = new Schema(
  {
    name: stringRequired,
    password: stringRequired,
    role: {
      type: String,
      default: "guest",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

UserSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model<UserI>("User", UserSchema);
