const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());
app.use(cors());

const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/carbonDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "User exists" });

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hash });
  await user.save();

  res.json({ message: "Registered" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ message: "Login fail" });

  res.json({
    message: "Login success",
    user: {
      email: user.email,
      username: user.username
    }
  });
});

app.listen(3000, () => console.log("Server running"));
