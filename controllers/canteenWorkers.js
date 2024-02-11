const Parent = require("../models/parent");
const ObjectId = require("mongodb").ObjectId;

module.exports.foodOrder = async (req, res) => {
  try {
    // Retrieve all parents with food order history
    const parentsWithFoodOrders = await Parent.find({ "foodOrderHistory.0": { $exists: true } });

    // Extract food reservations from each parent
    const allFoodReservations = parentsWithFoodOrders
      .map(parent => parent.foodOrderHistory.filter(order => !order.cancelled))
      .flat();

    res.render("canteenWorker/foodOrder", { foodReservations: allFoodReservations });
  } catch (error) {
    console.error('Error retrieving food reservations:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports.withdraw = (req, res) => {
  res.render("canteenWorker/withdraw");
};

module.exports.viewBalance = (req, res) => {
  res.render("canteenWorker/viewBalance");
};

module.exports.QR = (req, res) => {
  res.render("canteenWorker/QR");
};

module.exports.inventoryManagement = (req, res) => {
  res.render("canteenWorker/inventoryManagement");
};
