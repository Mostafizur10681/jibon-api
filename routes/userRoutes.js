const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
  allUser,
  singleUser,
  deleteUser,
} = require("../controllers/userController");
const requireAdmin = require("../middleware/requireAdmin");
const requireAuth = require("../middleware/requireAuth");

// express router
const router = express();

// signup
router.post("/signup", signupUser);

// login
router.post("/login", loginUser);

// update
router.patch('/admin/upateduser/:id', requireAuth, requireAdmin, updateUser);

// all users
router.get('/admin/alluser', requireAuth, requireAdmin, allUser);

// single user
router.get('/admin/:id', requireAuth, requireAdmin, singleUser);

// delete user
router.delete('/admin/:id', requireAuth, requireAdmin, deleteUser);

// export router
module.exports = router;
