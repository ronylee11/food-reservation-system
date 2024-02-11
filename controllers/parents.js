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
  parent.transactionHistory.push({
    description: `Withdrawn ${amount}`,
    balance: parent.accountBalance - parseInt(amount),
    date: new Date(),
  });
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
  parent.transactionHistory.push({
    description: `Top up ${amount}`,
    balance: parent.accountBalance + parseInt(amount),
    date: new Date(),
  });
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
  if (parent.accountBalance > parseInt(price)) {
    parent.foodOrderHistory.push({ foodType, price, date });
    parent.transactionHistory.push({
      description: `Purchased ${foodType}`,
      balance: parent.accountBalance - parseInt(price),
      date,
    });
    parent.accountBalance -= parseInt(price);
    parent.save();
    res.redirect("/parent/food_order");
  } else {
    req.flash("error", "Insufficient balance. Please top up your account.");
    res.redirect("/");
  }
};

module.exports.transactionHistory = async (req, res) => {
  const userID = new ObjectId(req.user._id);
  const parent = await Parent.findOne({ user: userID });
  res.render("parent/transactionHistory", {
    parent,
  });
};
