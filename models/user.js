const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 70 },
  mail: { type: String, required: true, min: 6, max: 60, unique: true },
  password: { type: String, required: true, min: 6, max: 12 },
  rol: { type: String, required: true, enum: ["ADMIN_ROLE", "USER_ROLE"] },
  Date: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
