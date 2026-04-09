const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User created");
});

module.exports = router;
