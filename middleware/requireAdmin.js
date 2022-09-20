const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).send({ message: "Unauthorized User" });
  }

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await UserModel.findById({ _id });

      if (req.user.role === "admin") {
        next();
      }
    } catch (error) {
      res.status(401).send({ message: "Unauthorized User" });
    }
  }
};

module.exports = requireAdmin;
