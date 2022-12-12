require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const port = 5000;
const db = require("./db/db");
var bodyParser = require("body-parser");
db();
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(bodyParser.json());
// parse application/json

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/postRoute"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
