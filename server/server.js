const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/eco");

app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(3000, () => console.log("Server started"));
