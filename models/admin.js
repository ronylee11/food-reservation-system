const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema, model: Model } = mongoose;

const userSchema = new Schema({
  username: String,
  password: String, // This field will be automatically handled by passport-local-mongoose
  phoneNumber: String,
  userType: {
    type: String,
    enum: ["admin", "canteenWorker", "parent"],
    default: "parent",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

userSchema.plugin(passportLocalMongoose);

module.exports = Model("User", userSchema);
