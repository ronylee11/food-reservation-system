const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAdmin } = require("../middleware");
const user = require("../controllers/users");
const admin = require("../controllers/admins");


router
    .route("/user_data")
    .get(isAdmin, admin.userData)

router
    .route("/view_withdraw")
    .get(isAdmin, admin.viewWithdraw)

router
    .route("/view_payment")
    .get(isAdmin, admin.viewPayment)

router
    .route("/view_top_up")
    .get(isAdmin, admin.viewTopUp)
router
    .route("/menu_update")
    .get(isAdmin, admin.menuUpdate)

module.exports = router;
