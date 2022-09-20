// import express
const express = require("express");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

// import mongoose
const mongoose = require("mongoose");

// port = 5000
const port = process.env.PORT || 5000;

// app
const app = express();

// middleware
app.use(express.json());

// user routes
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
