const express = require('express');
// import mongooes
const mongoose = require('mongoose');


// port = 5000
const port = process.env.PORT || 5000;

// app
const app = express();

// middleware
app.use(express.json())


mongoose.connect('mongodb+srv://jibonApi:n1XUgYkuYZf2Wtee@cluster0.0dldsqn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(port, (req, res) => {
            console.log('The Jibon app is running on port : ', port);
        })
    })
    .catch((error) => {
        console.log(error)
    })


