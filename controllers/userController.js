
// import json web token
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require("dotenv").config();

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3d" });
};

// signup controller
const signupUser = async (req, res) => {

    // get all info from user
    const { name, email, password, address, phone, aboutInfo } = req.body;

    try {
        const user = await UserModel.signup(name, email, password, address, phone, aboutInfo);

        const token = createToken(user._id);
        // successfull status
        res.status(200).json({ email, token });
    } catch (error) {
        // error status
        res.status(400).json({ error: error.message })
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

// update user Info
// const updateUser = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const user = await UserModel.findOneAndUpdate({ _id: id }, { ...req.body })
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// }


const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findOneAndUpdate({ _id: id }, {
            $set: {
                name: req.body?.name,
                email: req.body?.email,
                password: req.body?.password,
                address: req.body?.address,
                phone: req.body?.phone,
                aboutInfo: req.body?.aboutInfo
            }

        },
            {
                new: true,
                upsert: true,
            }
        );
        res.status(200).json(user)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// export module
module.exports = {
    signupUser,
    loginUser,
    updateUser
}
