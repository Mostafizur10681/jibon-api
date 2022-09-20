const express = require("express");
const {
  signupUser,
  loginUser,
  updateUser,
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
router.patch("/updatedUser/:id", requireAuth, requireAdmin, updateUser);

router.delete("/deleteUser/:id", requireAuth, requireAdmin, updateUser);
router.get("/singleUser/:id", requireAuth, requireAdmin, updateUser);
router.get("/allUser", requireAuth, requireAdmin, updateUser);

// export router
module.exports = router;
