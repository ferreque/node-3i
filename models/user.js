const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 12 },
  mail: { type: String, required: true, min: 6, max: 60, unique: true },
  password: { type: String, required: true, min: 6, max: 12 },
  Date: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
