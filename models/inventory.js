const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const inventorySchema = new Schema({
    item: String,
    unit: String,
    amount: Number,
});

module.exports = Model("Inventory", inventorySchema);
