const express = require("express");
const router = express.Router();
const game = require("../models/games");

//get
router.get("/", async (req, res) => {
  try {
    const Games = await game.find();
    res.status(200).json(Games);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const Game = await game.findOne({ name: req.params.id });
    res.status(200).json(Game);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//post
router.post("/", async (req, res) => {
  const confirm = await game.exists({ name: req.body.name });
  if (confirm) {
    res.status(400).json({ message: "Already exists" });
  } else {
    const Game = new game(req.body);
    try {
      const Newgame = await Game.save();
      res.status(200).json({ message: "Game added" });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
});

//patch
router.patch("/:id", async (req, res) => {
  try {
    if (req.body.name != null) {
      const Game = await game.findOneAndUpdate(
        { name: req.params.id },
        { name: req.body.name }
      );
    }
    if (req.body.img != null) {
      const Game = await game.findOneAndUpdate(
        { name: req.params.id },
        { img: req.body.img }
      );
    }
    if (req.body.price != null) {
      const Game = await game.findOneAndUpdate(
        { name: req.params.id },
        { price: req.body.price }
      );
      if (req.body.genre != null) {
        const Game = await game.findOneAndUpdate(
          { name: req.params.id },
          { genre: req.body.genre }
        );
      }
    }
    res.status(200).json({ message: "Updated successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
