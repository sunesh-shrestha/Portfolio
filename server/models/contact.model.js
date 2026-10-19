import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String
});

export default mongoose.model("Contact", ContactSchema);