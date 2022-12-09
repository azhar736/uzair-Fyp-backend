const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    maxLength: 64,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  userbids: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
