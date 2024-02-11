const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isCanteenWorker } = require("../middleware");
const user = require("../controllers/users");
const canteenWorker = require("../controllers/canteenWorkers");

router
    .route("/food_order")
    .get(isCanteenWorker, canteenWorker.foodOrder);

router
    .route("/withdraw")
    .get(isCanteenWorker, canteenWorker.withdraw);

router
    .route("/view_balance")
    .get(isCanteenWorker, canteenWorker.viewBalance);

router
    .route("/QR")
    .get(isCanteenWorker, canteenWorker.QR);

router
    .route("/Inventory")
    .get(isCanteenWorker, canteenWorker.inventoryManagement)
    .post(isCanteenWorker, canteenWorker.updateInventoryManagement);

module.exports = router;
