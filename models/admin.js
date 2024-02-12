const mongoose = require("mongoose");
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

module.exports = Model("Admin", adminSchema);
