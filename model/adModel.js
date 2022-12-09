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
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
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
      type: String,
    },
  ],
});

module.exports = mongoose.model("Ads", adSchema);
