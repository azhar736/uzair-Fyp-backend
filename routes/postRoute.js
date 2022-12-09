const { Router } = require("express");
const express = require("express");
const {
  addPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
  makeBid,
} = require("../controllers/adController");
const router = express.Router();

router.post("/addPost", addPost);
router.get("/getAllPost", getAllPost);
router.get("/getSinglePost/:id", getSinglePost);
router.delete("/deletePost/:id", deletePost);
router.patch("/updatePost/:id", updatePost);
router.post("/makeBid/:postId", makeBid);

module.exports = router;
