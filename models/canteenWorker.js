const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const canteenWorkerSchema = new Schema({
  accountBalance: {
    type: Number,
    default: 0,
  },
 
  foodOrderHistory: {
    type: Array,
    default: [],
  },

  inventoryManage:{
    type: Array,
    default: [],
  }
});

module.exports = Model("CanteenWorker", userSchema);
