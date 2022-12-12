const { Router } = require("express");
const upload = require("../helpers/helper");
const express = require("express");
const {
  addPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
  makeBid,
  getUserPost,
} = require("../controllers/adController");
const router = express.Router();

router.post("/addPost", upload.single("Photo"), addPost);
router.get("/getAllPost", getAllPost);
router.get("/getSinglePost/:id", getSinglePost);
router.delete("/deletePost/:id", deletePost);
router.patch("/updatePost/:id", updatePost);
router.post("/makeBid/:postId", makeBid);
router.get("/getUserPost/:userId", getUserPost);

module.exports = router;
