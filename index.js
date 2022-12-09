require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const db = require("./db/db");
var bodyParser = require("body-parser");
db();

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/postRoute"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
