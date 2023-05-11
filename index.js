const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;

//Connecting database
require("./db/mongoose");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to JOGO server" });
});

const userRouter = require("./routes/users");
app.use("/users", userRouter);

const gamesRouter = require("./routes/games");
app.use("/products", gamesRouter);

//Starting server
app.listen(port, () => {
  console.log("Server is running on port 3001");
});
