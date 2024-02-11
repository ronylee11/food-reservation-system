const Parent = require("../models/parent");
const Inventory = require("../models/inventory");
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

module.exports.updateInventoryManagement = async (req, res) => {
  try {
      const { inventoryData } = req.body;

      // Validate and save the inventoryData to MongoDB
      if (Array.isArray(inventoryData) && inventoryData.length > 0) {
          // Clear existing inventory data before updating (if needed)
          await Inventory.deleteMany({});

          // Insert the new inventory data
          await Inventory.insertMany(inventoryData);

          res.status(200).json({ message: 'Inventory data saved successfully!' });
      } else {
          res.status(400).json({ message: 'Invalid inventory data' });
      }
  } catch (error) {
      console.error('Error updating inventory:', error);
      res.status(500).json({ message: 'Internal Server Error' });
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

module.exports.inventoryManagement = async (req, res) => {
    const inventoryManagementList = await Inventory.find({});
    res.render("canteenWorker/inventoryManagement", { inventoryManagementList });
};
