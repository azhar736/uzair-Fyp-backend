const express = require("express");
const {
  SignUp,
  VerifyToken,
  SignIn,
  forgotPasswords,
  changePassword,
  getAlluser,
  getSingleUser,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", SignUp);
// router.post("/:id/verify/:token", VerifyToken);
router.post("/signin", SignIn);
router.post("/forget", forgotPasswords);
router.post("/change-password", changePassword);
router.get("/getAlluser", getAlluser);
router.get("/getSignleUser/:id", getSingleUser);
module.exports = router;
