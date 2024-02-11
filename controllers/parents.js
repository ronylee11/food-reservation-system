const Parent = require("../models/parent");

module.exports.foodReservation = (req, res) => {
  res.render("parent/foodReservation");
};

module.exports.topUp = (req, res) => {
  res.render("parent/topUp");
};

module.exports.withdraw = (req, res) => {
  res.render("parent/withdraw");
};

module.exports.viewBalance = (req, res) => {
  res.render("parent/viewBalance");
};

module.exports.foodOrder = (req, res) => {
  res.render("parent/foodOrder");
};
