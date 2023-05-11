require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB)
  .then(() => console.log("connected to db successfully"))
  .catch((e) => console.log({ message: e.message }));
