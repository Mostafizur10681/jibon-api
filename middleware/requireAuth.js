const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();
const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: "Forbidden Access" });
  }

  // if (authorization && authorization.startsWith("Bearer")) {
    try {
      const token = authorization.split(" ")[1];
      const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await UserModel.findById(_id).select("_id");
      next();
    } catch (error) {
      res.status(401).send({ message: "Forbidden Access" });
    }
  // }
};

module.exports = requireAuth;
