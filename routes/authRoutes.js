const express = require("express");
const {
  SignUp,
  VerifyToken,
  SignIn,
  forgotPasswords,
  changePassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", SignUp);
// router.post("/:id/verify/:token", VerifyToken);
router.post("/signin", SignIn);
router.post("/forget", forgotPasswords);
router.post("/change-password", changePassword);
module.exports = router;
