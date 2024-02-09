const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isParent } = require("../middleware");
const user = require("../controllers/users");
const parent = require("../controllers/parent");

router
    .route("/food_reservation")
    .get(isParent, parent.foodReservation)

module.exports = router;
