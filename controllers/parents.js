const Parent = require("../models/parent");
const parent = new Parent();
const Food = require("../models/food");

module.exports.foodReservation = async (req, res) => {
  const foodsList = await Food.find({});
  res.render("parent/foodReservation", { foodsList });
};

module.exports.topUp = (req, res) => {
  res.render("parent/topUp");
};

module.exports.withdraw = (req, res) => {
  res.render("parent/withdraw");
};

module.exports.viewBalance = (req, res) => {
  const { accountBalance } = parent;
  res.render("parent/viewBalance", { accountBalance });
};

module.exports.foodOrder = (req, res) => {
  res.render("parent/foodOrder", { foodOrderHistory: parent.foodOrderHistory });
};

module.exports.updateFoodOrder = (req, res) => {
  const { foodOrderHistory } = parent;
  const { foodType, price } = req.body;
  const date = new Date();
  foodOrderHistory.push({ foodType, price, date });
  console.log(foodOrderHistory);
  parent.foodOrderHistory = foodOrderHistory;
  res.render("parent/foodOrder", { foodOrderHistory: parent.foodOrderHistory });
};

module.exports.clearFoodOrder = (req, res) => {
  parent.foodOrderHistory = [];
  res.render("parent/foodOrder", { foodOrderHistory: parent.foodOrderHistory });
};
