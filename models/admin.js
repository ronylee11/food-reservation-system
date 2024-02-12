const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const { Schema, model: Model } = mongoose;

const adminSchema = new Schema({
  active: {
    type: Boolean,
    default: true,
  },
  user: {
    // link to user
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

userSchema.plugin(passportLocalMongoose); // add username and password to schema

module.exports = Model("Admin", adminSchema);
