// Define Schema for each User
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose"); // username, password in schema with a lot of builtin functions for authentication

const userSchema = new Schema({
  phoneNumber: Number,
});
userSchema.plugin(passportLocalMongoose); // includes username, password in schema

module.exports = Model("User", userSchema);
