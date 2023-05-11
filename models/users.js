require("../db/mongoose");

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  Uname: { type: String, require: true },
  password: { type: String, require: true },
  games: { type: Array, require: true },
});

const user = mongoose.model("user", userSchema);

module.exports = user;
