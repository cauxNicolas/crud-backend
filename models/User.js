const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  textarea: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
