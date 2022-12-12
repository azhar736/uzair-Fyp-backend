const express = require("express");
const {
  SignUp,
  SignIn,
  forgotPasswords,
  changePassword,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn);
router.post("/forget", forgotPasswords);
router.post("/change-password", changePassword);
module.exports = router;
