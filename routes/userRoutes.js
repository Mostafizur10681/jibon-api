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

// all user
router.get("/allUser", requireAuth, requireAdmin, allUser);

// single user
router.get("/singleUser/:id", requireAuth, requireAdmin, singleUser);

// update
router.patch("/updatedUser/:id", requireAuth, requireAdmin, updateUser);

// delete user
router.delete("/deleteUser/:id", requireAuth, requireAdmin, deleteUser);



// export router
module.exports = router;
