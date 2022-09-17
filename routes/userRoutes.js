const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController');

// express router
const router = express();

// signup
router.post('/signup', signupUser);

// login
router.post('/login', loginUser);


// export router
module.exports = router;