const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  activities: Array
});

module.exports = mongoose.model("User", UserSchema);
