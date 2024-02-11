// routes/admins.js

const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isAdmin } = require("../middleware");
const admin = require("../controllers/admins");
const User = require("../models/user");


router.get("/user_data", isAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.render("admin/userData", { users });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});



router.get("/view_withdraw", isAdmin, admin.viewWithdraw);
router.get("/view_payment", isAdmin, admin.viewPayment);
router.get("/view_top_up", isAdmin, admin.viewTopUp);
router.get("/menu_update", isAdmin, admin.menuUpdate);

module.exports = router;
