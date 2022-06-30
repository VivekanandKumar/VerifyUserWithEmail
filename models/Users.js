const { Schema, model } = require("mongoose");

const Users = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordChanged: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", Users);
