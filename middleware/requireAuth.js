
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel")
require("dotenv").config();
const requireAuth = async (req, res, next) => {


  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ message: 'Unthorization access' })
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = await UserModel.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).send({ message: 'Forbidden Acess' })
  }

};

module.exports = requireAuth;

