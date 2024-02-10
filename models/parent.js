// Define Schema for each User
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
});

module.exports = Model("Parent", userSchema);
