const Parent = require("../models/parent");
const Food = require("../models/food");
const ObjectId = require("mongodb").ObjectId;

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

module.exports.withdrawBalance = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  const { amount } = req.body;
  parent.accountBalance -= parseInt(amount);
  parent.save();
  res.render("parent/viewBalance", { accountBalance: parent.accountBalance });
};

module.exports.viewBalance = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  res.render("parent/viewBalance", { accountBalance: parent.accountBalance });
};

module.exports.updateBalance = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  const { amount } = req.body;
  parent.accountBalance += parseInt(amount);
  parent.save();
  res.render("parent/viewBalance", { accountBalance: parent.accountBalance });
};

module.exports.foodOrder = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  res.render("parent/foodOrder", { foodOrderHistory: parent.foodOrderHistory });
};

module.exports.updateFoodOrder = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  const { foodType, price } = req.body;
  const date = new Date();
  parent.foodOrderHistory.push({ foodType, price, date });
  parent.save();
  res.render("parent/foodOrder", { foodOrderHistory: parent.foodOrderHistory });
};

module.exports.clearFoodOrder = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  parent.foodOrderHistory = [];
  parent.save();
  res.redirect("/parent/food_order");
};
