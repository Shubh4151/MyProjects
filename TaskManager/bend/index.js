const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const rt = require("./routes/rt");
mongoose.connect("mongodb://127.0.0.1:27017/todo_app").then(() => {
  console.log("ok");
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", rt);
app.listen(5000);
