const mongoose = require("mongoose");

const { Schema } = mongoose;

const bidSchema = new Schema({
  buyerId: {
    type: String,
    required: true,
  },

  postId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
