
// import json web token
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');


// signup controller
const signupUser = async (req, res) => {

    // get all info from user
    const { name, email, password, address, phone, aboutInfo, } = req.body;

    try {
        const user = await UserModel.signup({ name, email, password, address, phone, aboutInfo, role });

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
                findAndModify: false,
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
