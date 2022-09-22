const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

// routes for user
app.use("/user", userRoutes);
// routes for event
app.use("/event", eventRoutes);

// connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0dldsqn.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, (req, res) => {
      console.log("The Jibon app is running on port : ", port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
