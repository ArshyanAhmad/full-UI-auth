import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcryptjs.hash(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  const isMatch = await bcryptjs.compare(password, this.password);
  return isMatch;
};

export const User = mongoose.model("User", userSchema);
