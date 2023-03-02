const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 12 },
  mail: { type: String, required: true, min: 6, max: 60 },
  password: { type: String, required: true, min: 6, max: 12 },
  Date: { type: Date, default: Date.now },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
