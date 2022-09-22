const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
  allUser,
  singleUser,
  deleteUser,
  createUser,
} = require("../controllers/userController");
const requireAdmin = require("../middleware/requireAdmin");
const requireAuth = require("../middleware/requireAuth");

// express router
const router = express();

// signup user
router.post("/signup", signupUser);

// login user
router.post("/login", loginUser);

// all users
router.get("/admin/allUser", requireAuth, requireAdmin, allUser);

// single user
router.get("/admin/singleUser/:id", requireAuth, requireAdmin, singleUser);

// create user
router.post("/admin/createUser", requireAuth, requireAdmin, createUser);

// update user
router.patch("/admin/updatedUser/:id", requireAuth, requireAdmin, updateUser);

// delete user
router.delete("/admin/deleteUser/:id", requireAuth, requireAdmin, deleteUser);

// export router
module.exports = router;
