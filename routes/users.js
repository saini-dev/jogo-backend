const express = require("express");
const router = express.Router();
const user = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const users = await user.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/exists/uname/:id", async (req, res) => {
  try {
    const User = await user.exists({ Uname: req.params.id });
    if (User) {
      res.status(200).json({ message: "yes" });
    } else {
      res.status(200).json({ message: "no" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/exists/email/:id", async (req, res) => {
  try {
    const User = await user.exists({ email: req.params.id });
    if (User) {
      res.status(200).json({ message: "yes" });
    } else {
      res.status(200).json({ message: "no" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const User = await user.findOne({ Uname: req.params.id });
    res.status(200).json({ User });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  const confirm = await user.exists({ Uname: req.body.Uname });
  const confirm1 = await user.exists({ email: req.body.email });
  if (confirm || confirm1) {
    res.status(400).json({ message: "User already exists" });
  } else {
    const User = await new user({
      name: req.body.name,
      email: req.body.email,
      Uname: req.body.Uname,
      password: req.body.password,
      games: req.body.games,
    });
    try {
      await User.save();
      res.status(200).json({ message: "User created", User });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
});

router.patch("/:id", getUser, async (req, res) => {
  if (req.body.name) {
    res.User.name = req.body.name;
  }
  if (req.body.email) {
    res.User.email = req.body.email;
  }
  if (req.body.password) {
    res.User.password = req.body.password;
  }
  if (req.body.Uname) {
    res.User.Uname = req.body.Uname;
  }
  if (req.body.games) {
    for (const item of req.body.games) {
      res.User.games.push(item);
    }
  }
  try {
    await res.User.save();
    res.status(200).json({ message: "Updated successfully" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await user.deleteOne({ Uname: req.params.id });
    res.status(200).json({ message: "User deleted" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

async function getUser(req, res, next) {
  let User;
  try {
    User = await user.findOne({ Uname: req.params.id });
    if (User === null) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ messaage: e.message });
  }
  res.User = User;
  next();
}

module.exports = router;
