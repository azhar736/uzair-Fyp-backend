const mongoose = require("mongoose");

const { Schema } = mongoose;

const bidSchema = new Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ad",
  },
  price: {
    type: Number,
    required: true,
  },
  bidderName: {
    type: String,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
