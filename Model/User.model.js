const mongoose = require("mongoose");

const userSchima = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const Usermodel = mongoose.model("user", userSchima);

module.exports = {
  Usermodel,
};
