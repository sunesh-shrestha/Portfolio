import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    required: "Email is required"
  },
  password: {
    type: String,
    required: "Password is required"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

export default mongoose.model("User", UserSchema);