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
  inventoryManage: {
    type: Array,
    default: [],
  },
  user: {
    // link to user
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Model("CanteenWorker", canteenWorkerSchema);
