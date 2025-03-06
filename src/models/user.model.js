import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
userSchema.pre("save", function (next) {
    this.updated_at = new Date();
    next();
});

const User = mongoose.model("User", userSchema);
export default User;







