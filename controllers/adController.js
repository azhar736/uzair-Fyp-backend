const Ad = require("../model/adModel");
const Bid = require("../model/bidModel");
const User = require("../model/userModel");
const asyncHandler = require("express-async-handler");
const { find } = require("../model/adModel");

//POST an ADS
const addPost = async (req, res) => {
  const {
    name,
    type,
    price,
    description,
    age,
    weight,
    image,
    teeth,
    city,
    sellerId,
  } = req.body;
  try {
    const newPost = await new Ad({
      name,
      type,
      price,
      description,
      age,
      weight,
      image,
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
    const post = await Ad.findById({ _id: id });
    if (post) {
      res.send({ success: true, data: post });
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
    const makebid = await new Bid({ buyerId, price, postId }).save();
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

//Winner of Bid

module.exports = {
  addPost,
  getAllPost,
  getSinglePost,
  deletePost,
  updatePost,
  makeBid,
};
