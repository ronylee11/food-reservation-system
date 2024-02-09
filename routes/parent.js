const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isParent } = require("../middleware");
const user = require("../controllers/users");
const parent = require("../controllers/parent");

router
    .route("/food_reservation")
    .get(isParent, parent.foodReservation)

router
    .route("/top_up")
    .get(isParent, parent.topUp)

router
    .route("/withdraw")
    .get(isParent, parent.withdraw)

router
    .route("/view_balance")
    .get(isParent, parent.viewBalance)

router
    .route("/food_order")
    .get(isParent, parent.foodOrder)

module.exports = router;
