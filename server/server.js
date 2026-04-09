const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import model
const User = require("./models/User");

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/carbonDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// CO2 data
const activityCO2 = {
  transport: 2.3,
  food: 1.5,
  energy: 3.0
};

// ROUTES

// Register
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Login fail" });
  }

  res.json({ message: "Login successful", user });
});

// Get CO2 data
app.get("/activities", (req, res) => {
  res.json(activityCO2);
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
