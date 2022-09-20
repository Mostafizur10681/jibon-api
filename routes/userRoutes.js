const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
} = require("../controllers/userController");

// express router
const router = express();

// signup
router.post("/signup", signupUser);

// login
router.post("/login", loginUser);

// update
router.patch('/upateduser/:id', updateUser);

// =======
router.patch("/:id", updateUser);


// export router
module.exports = router;
