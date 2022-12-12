const Ad = require("../model/adModel");
const Bid = require("../model/bidModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { find } = require("../model/adModel");

//POST an ADS
const addPost = async (req, res) => {
  console.log(req.file);
  console.log(req.body);
  if (req.file) {
    res.status(200);
  } else {
    res.status(404).send("not added");
  }
  const Photo = req.file.filename;
  const { name, type, price, description, age, weight, teeth, city, sellerId } =
    req.body;
  try {
    const newPost = await new Ad({
      name,
      type,
      price,
      description,
      age,
      weight,
      Photo,
      teeth,
      city,
      sellerId,
    }).save();
    if (newPost) {
      res.send({ success: true, data: newPost });
    }
  } catch (error) {
    console.log(error?.message);
    res.send({ success: false, error: error?.message });
  }
};

//GET ALL ADS

const getAllPost = async (req, res) => {
  try {
    const allPost = await Ad.find({});
    if (allPost) res.send({ success: true, data: allPost });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

//GET INDIVISUAL ADS

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Ad.findById({ _id: id }).populate("bids");
    if (post) {
      const { name } = await User.findOne({ _id: post.sellerId });

      res.send({ success: true, data: post, sellarName: name });
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

//DELETE INDIVISUAL ADS

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletepost = await Ad.findByIdAndDelete(id);
    if (deletepost)
      res.send({ success: true, message: "post has been deleted" });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

//UPDATE INDIVISUAL ADS
const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const updatePost = await Ad.findByIdAndUpdate(id, req.body, { new: true });
    if (updatePost) res.send({ success: true, data: updatePost });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

//BId on Ads

const makeBid = async (req, res) => {
  const { postId } = req.params;
  const { buyerId, price } = req.body;
  var post, user;
  try {
    const { name } = await User.findOne({ _id: buyerId });
    const makebid = await new Bid({
      buyerId,
      price,
      postId,
      bidderName: name,
    }).save();
    if (makebid) {
      const post1 = await Ad.findOne({ _id: postId });
      if (post1.bids.length >= 1) {
        post = await Ad.findByIdAndUpdate(makebid.postId, {
          bids: [...post1.bids, makebid._id],
        });
      } else {
        const post = await Ad.findByIdAndUpdate(makebid.postId, {
          bids: [makebid._id],
        });
      }
      const user1 = await User.findOne({ _id: buyerId });
      if (user1.userbids.length >= 1) {
        user = await User.findByIdAndUpdate(makebid.buyerId, {
          userbids: [...user1.userbids, makebid._id],
        });
      } else {
        user = await User.findByIdAndUpdate(makebid.buyerId, {
          userbids: [makebid._id],
        });
      }

      if (post && user) {
        res.send({ success: true, message: "bid has been added successfully" });
      }
    }
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

// get users ads
const getUserPost = async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Ad.find({ sellerId: userId });
    if (posts.length > 0) res.send({ success: true, data: posts });
  } catch (error) {
    res.send({ success: false, error: error.message });
  }
};

//Winner of Bid

module.exports = {
  addPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
  makeBid,
  getUserPost,
};
