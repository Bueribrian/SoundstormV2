import mongoose from "mongoose";
const { Schema, Document } = mongoose;

interface RoomI extends Document {
  name: string;
  playlist: string[];
  user: object;
  chat: string[];
}

const RoomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    playlist: {
      type: [],
      default: {
        song:
          "https://www.youtube.com/watch?v=LoheCz4t2xc&ab_channel=systemofadownVEVO",
        created_at: Date.now(),
        updated_at: Date.now(),
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
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default mongoose.model<RoomI>("Room", RoomSchema);
