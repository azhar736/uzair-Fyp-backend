const mongoose = require("mongoose");

const connectionURL = process.env.DB_URL;
// Prints "MongoServerError: bad auth Authentication failed."

const ConnectToMongo = async () => {
  try {
    await mongoose.connect(connectionURL, () => {
      console.log("Connected to Database Successfully 🟢 🟢 🟢 ");
    });
  } catch (error) {
    console.error(error);
  }
};
module.exports = ConnectToMongo;
