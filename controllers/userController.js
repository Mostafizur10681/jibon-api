
// import json web token
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');


// signup controller
const signupUser = async (req, res) => {

    // get name, email, password from user
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.signup(name, email, password);

        // successfull status
        res.status(200).json({ name, email })
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

        res.status(200).json({ email })
    } catch (error) {

        res.status(400).json({ error: error.message });
    }

};

module.exports = {
    signupUser,
    loginUser
}
