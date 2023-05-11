const mongoose = require("mongoose");

const gamesSchema = mongoose.Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  genre: { type: Array, required: true },
});

const game = mongoose.model("game", gamesSchema);

module.exports = game;
