const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/eco")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const User = require("./models/User");

// REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password, activities: [] });
  await user.save();

  res.json({ message: "User registered" });
});

// LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json(user);
});

// SAVE ACTIVITY
app.post("/activity", async (req, res) => {
  const { email, activity } = req.body;

  const user = await User.findOne({ email });
  user.activities.push(activity);

  await user.save();

  res.json(user);
});

app.listen(3000, () => console.log("Server started"));
