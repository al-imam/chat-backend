import { Schema, model } from "mongoose";
import getRandomColor from "../utilitys/getRandomColor";

const userScheme = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      type: Schema.Types.Mixed,
      default: getRandomColor("n"),
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export default model("User", userScheme);
