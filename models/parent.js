// Define Schema for each Parent
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const parentSchema = new Schema({
  accountBalance: {
    type: Number,
    default: 0,
  },
  transactionHistory: {
    type: Array,
    default: [],
  },
  foodOrderHistory: {
    type: Array,
    default: [],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Model("Parent", parentSchema);
