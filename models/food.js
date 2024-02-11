// Define Schema for each Food
const mongoose = require("mongoose");
const { Schema, model: Model } = mongoose;

const foodSchema = new Schema({
  imageUrl: String,
  foodName: String,
  price: Number,
});

module.exports = Model("Food", foodSchema);
