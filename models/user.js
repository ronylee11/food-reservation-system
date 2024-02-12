// Define Schema for each User
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose"); // username, password in schema with a lot of builtin functions for authentication

const userSchema = new Schema({
  phoneNumber: Number,
  userType: {
    type: String,
    enum: ["admin", "canteenWorker", "parent"],
    default: "parent",
  },
});
userSchema.plugin(passportLocalMongoose); // includes username, password in schema

// pre-save hook to lowercase username
userSchema.pre("save", function (next) {
  this.username = this.username.toLowerCase();
  next();
});

module.exports = Model("User", userSchema);
