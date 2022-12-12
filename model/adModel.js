const mongoose = require("mongoose");

const { Schema } = mongoose;

const adSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  Photo: {
    type: String,
  },
  teeth: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  sellerId: {
    type: String,
    required: true,
  },
  bids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
    },
  ],
});

module.exports = mongoose.model("Ads", adSchema);
