<<<<<<< HEAD

const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel")

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
=======
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Unauthorized User" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { email } = jwt.verify(token, "SECRET_KEY");

    req.user = await UserModel.findOne({ email, role: "admin" });
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized User" });
  }
};

module.exports = requireAuth;
>>>>>>> bdbfa03c62fa8edf6185a104f856dabc5f7be59c
