import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

export const User = mongoose.model("User", userSchema);
