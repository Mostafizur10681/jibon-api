const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");

const createToken = (_id) => {
  return jwt.sign({ _id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
    expiresIn: "3d",
  });
};

// signup controller
const signupUser = async (req, res) => {
  // get all info from user
  const { name, email, password, address, phone, aboutInfo } = req.body;

  try {
    const user = await UserModel.signup(
      name,
      email,
      password,
      address,
      phone,
      aboutInfo
    );

    res.status(200).json({ name, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all user
const allUser = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ users, message: "These are all users" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get single user
const singleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ error: "Not such a user" });
    } else {
      res.status(200).json({
        user,
        message: "This is a single user",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create user
const createUser = async (req, res) => {
  const { name, email, address, phone, aboutInfo } = req.body;
  const password = (Math.random() + 1).toString(36).substring(5);

  try {
    const user = await UserModel.signup(
      name,
      email,
      password,
      address,
      phone,
      aboutInfo
    );

    res.status(200).json({ name, email });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: req.body?.name,
          email: req.body?.email,
          password: req.body?.password,
          address: req.body?.address,
          phone: req.body?.phone,
          aboutInfo: req.body?.aboutInfo,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOneAndDelete({ _id: id });

    if (!user) {
      return res.status(400).json({ error: "Not such a User" });
    } else {
      res.status(200).json({ user, message: "User deleted successfully!" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// export module
module.exports = {
  signupUser,
  loginUser,
  updateUser,
  allUser,
  singleUser,
  deleteUser,
  createUser,
};
