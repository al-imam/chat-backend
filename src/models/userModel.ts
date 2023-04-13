import { Schema, model } from "mongoose";

const userScheme = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    type: Schema.Types.Mixed,
    default: { fg: "#fff", bg: "#000", character: "A" },
  },
});

export default model("User", userScheme);
